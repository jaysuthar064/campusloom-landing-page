<?php
define( 'DB_NAME', 'campus_loom' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', '' );
define( 'DB_HOST', '127.0.0.1:3306' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

define( 'AUTH_KEY',         'Y*4072TT*kF*L8*p6a@T]}x84[o=D.KdE#U,))79DBWtYS!#FwyrYf6hmy3ZC9t4' );
define( 'SECURE_AUTH_KEY',  'vS!qT@G=W7Wj(A:r5QG:RFjHSEHkrK!.vH@*n0lHCAg2_s+k,&KEPW4^qUqPq&:d' );
define( 'LOGGED_IN_KEY',    '-zmoL:ppcQO8M4b]Ej%[ag:2O**M{Jw:JT,U9q7zJZectCs@HZG3(i?w150$le_N' );
define( 'NONCE_KEY',        '94to.1(F@&+w56]a#{(VpvXDAqb2Nb9duMy:=[)$T-%Vy)T_%aA)@N0X5%SB%qRz' );
define( 'AUTH_SALT',        'ftaZt0k[q3]b27(lCsuJ3Y9+^W8KQo(eRMW8Xj-2$1?yS#vxJ@qJvn[+F+QJ2r)!' );
define( 'SECURE_AUTH_SALT', 'S7ZMq@=VYP$+rPP1HYis-Y2UKz.aq8l^])!wjweD(?l*Fnw5o)PI81tfSy.U-m5x' );
define( 'LOGGED_IN_SALT',   'dQHCgnqX}l2,5uW#:.)xtg(_HmO}24z{0A#BsY#-dPjLtN9anQzNwLs,M*G_Si+U' );
define( 'NONCE_SALT',       'pDT}yQ!sFKe8$QdZ#4lwf2T:Go^E*Rw=jAONd0J40p&:tXA}0.eLWXYhL!.W,sQ0' );

define( 'WP_HOME', 'http://localhost:8883' );
define( 'WP_SITEURL', 'http://localhost:8883' );
define( 'CAMPUS_LOOM_AUTO_LOGIN_TOKEN', '48a87322773045149d79b02153fe280f2e46ea82a07d432184c431fac946daa9' );

$table_prefix = 'wp_';

define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );

if ( ! defined( 'ABSPATH' ) ) {
    define( 'ABSPATH', __DIR__ . '/' );
}

require_once ABSPATH . 'wp-settings.php';
