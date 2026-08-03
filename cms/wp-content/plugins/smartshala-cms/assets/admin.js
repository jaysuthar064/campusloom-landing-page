/**
 * SmartShala CMS — admin behaviour.
 *
 * Three jobs: the media picker, repeater add/remove, and drag-to-reorder.
 * Everything is delegated from the document so rows added after load work
 * without rebinding.
 */
( function () {
	'use strict';

	var strings = window.smartshalaAdmin || {};

	/* ------------------------------------------------------------------
	 * Media picker
	 * ---------------------------------------------------------------- */

	document.addEventListener( 'click', function ( event ) {
		var button = event.target.closest( '[data-image-select]' );
		if ( ! button ) {
			return;
		}
		event.preventDefault();

		var wrap = button.closest( '[data-smartshala-image]' );
		if ( ! wrap || ! window.wp || ! window.wp.media ) {
			return;
		}

		var frame = window.wp.media( {
			title: strings.chooseImage || 'Choose image',
			button: { text: strings.useImage || 'Use this image' },
			library: { type: 'image' },
			multiple: false
		} );

		frame.on( 'select', function () {
			var attachment = frame.state().get( 'selection' ).first().toJSON();
			var input = wrap.querySelector( '[data-image-id]' );
			var preview = wrap.querySelector( '[data-image-preview]' );

			if ( input ) {
				input.value = attachment.id;
			}
			if ( preview ) {
				// Prefer a reasonably sized thumbnail for the preview.
				var src = attachment.url;
				if ( attachment.sizes && attachment.sizes.medium ) {
					src = attachment.sizes.medium.url;
				}
				preview.innerHTML = '';
				var img = document.createElement( 'img' );
				img.src = src;
				img.alt = '';
				preview.appendChild( img );
			}
		} );

		frame.open();
	} );

	document.addEventListener( 'click', function ( event ) {
		var button = event.target.closest( '[data-image-clear]' );
		if ( ! button ) {
			return;
		}
		event.preventDefault();

		var wrap = button.closest( '[data-smartshala-image]' );
		var input = wrap.querySelector( '[data-image-id]' );
		var preview = wrap.querySelector( '[data-image-preview]' );

		if ( input ) {
			input.value = 0;
		}
		if ( preview ) {
			preview.innerHTML = '<span class="smartshala-image__empty">No image selected</span>';
		}
	} );

	/* ------------------------------------------------------------------
	 * Repeaters
	 * ---------------------------------------------------------------- */

	/**
	 * Rewrite row indexes so the posted array is contiguous. Without this,
	 * removing row 1 of 3 would post indexes 0 and 2.
	 */
	function reindex( repeater ) {
		var base = repeater.getAttribute( 'data-name' );
		var rows = repeater.querySelectorAll( '[data-repeater-rows] > [data-repeater-row]' );

		Array.prototype.forEach.call( rows, function ( row, index ) {
			var fields = row.querySelectorAll( '[name]' );
			Array.prototype.forEach.call( fields, function ( field ) {
				field.name = field.name.replace(
					// Only the index that belongs to THIS repeater, not a nested one.
					new RegExp( '^' + escapeRegExp( base ) + '\\[[^\\]]*\\]' ),
					base + '[' + index + ']'
				);
			} );
		} );
	}

	function escapeRegExp( value ) {
		return value.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' );
	}

	document.addEventListener( 'click', function ( event ) {
		var button = event.target.closest( '[data-repeater-add]' );
		if ( ! button ) {
			return;
		}
		event.preventDefault();

		var repeater = button.closest( '[data-smartshala-repeater]' );
		var template = repeater.querySelector( '[data-repeater-template]' );
		var rows = repeater.querySelector( '[data-repeater-rows]' );
		if ( ! template || ! rows ) {
			return;
		}

		var count = rows.querySelectorAll( ':scope > [data-repeater-row]' ).length;

		// <template>.innerHTML gives back real markup — see the PHP side.
		var html = template.innerHTML.replace( /__INDEX__/g, String( count ) );

		var holder = document.createElement( 'div' );
		holder.innerHTML = html.trim();

		var row = holder.firstElementChild;
		if ( ! row ) {
			return;
		}

		rows.appendChild( row );
		reindex( repeater );

		var first = row.querySelector( 'input[type="text"], textarea' );
		if ( first ) {
			first.focus();
		}
	} );

	document.addEventListener( 'click', function ( event ) {
		var button = event.target.closest( '[data-repeater-remove]' );
		if ( ! button ) {
			return;
		}
		event.preventDefault();

		if ( ! window.confirm( strings.confirmRow || 'Remove this item?' ) ) {
			return;
		}

		var repeater = button.closest( '[data-smartshala-repeater]' );
		var row = button.closest( '[data-repeater-row]' );
		if ( row ) {
			row.remove();
			reindex( repeater );
		}
	} );

	/* Keep the row title in step with the field it mirrors. */
	document.addEventListener( 'input', function ( event ) {
		var input = event.target;
		if ( ! input.name ) {
			return;
		}

		var row = input.closest( '[data-repeater-row]' );
		if ( ! row ) {
			return;
		}

		var body = input.closest( '.smartshala-row__body' );
		if ( ! body ) {
			return;
		}

		// The first text input in the row drives its title.
		var first = body.querySelector( 'input[type="text"]' );
		if ( first === input ) {
			var title = row.querySelector( '.smartshala-row__title' );
			if ( title ) {
				title.textContent = input.value || 'Item';
			}
		}
	} );

	/* ------------------------------------------------------------------
	 * Drag to reorder
	 * ---------------------------------------------------------------- */

	var dragged = null;

	document.addEventListener( 'mousedown', function ( event ) {
		var bar = event.target.closest( '.smartshala-row__bar' );
		if ( ! bar || event.target.closest( '[data-repeater-remove]' ) ) {
			return;
		}
		var row = bar.closest( '[data-repeater-row]' );
		if ( row ) {
			row.setAttribute( 'draggable', 'true' );
		}
	} );

	document.addEventListener( 'dragstart', function ( event ) {
		var row = event.target.closest( '[data-repeater-row]' );
		if ( ! row ) {
			return;
		}
		dragged = row;
		row.classList.add( 'is-dragging' );
		event.dataTransfer.effectAllowed = 'move';
		// Firefox needs data set for the drag to start at all.
		event.dataTransfer.setData( 'text/plain', '' );
	} );

	document.addEventListener( 'dragover', function ( event ) {
		if ( ! dragged ) {
			return;
		}
		var row = event.target.closest( '[data-repeater-row]' );
		if ( ! row || row === dragged ) {
			return;
		}
		if ( row.parentNode !== dragged.parentNode ) {
			return;
		}

		event.preventDefault();

		var box = row.getBoundingClientRect();
		var after = event.clientY > box.top + box.height / 2;
		row.parentNode.insertBefore( dragged, after ? row.nextSibling : row );
	} );

	document.addEventListener( 'dragend', function () {
		if ( ! dragged ) {
			return;
		}
		dragged.classList.remove( 'is-dragging' );
		dragged.removeAttribute( 'draggable' );

		var repeater = dragged.closest( '[data-smartshala-repeater]' );
		if ( repeater ) {
			reindex( repeater );
		}
		dragged = null;
	} );
} )();
