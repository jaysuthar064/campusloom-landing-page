import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { API_ROOT } from '../../lib/api'
import { DEMO_FIELDS } from '../../lib/leadFields'

/**
 * The enquiry form, shared by /book-demo and /contact.
 *
 * Both post to the same endpoint; `source` is what separates them in
 * wp-admin → Demo Requests. Pass a different `fields` array to change the
 * shape of the form without touching the submit logic.
 */
function Field({ field, value, onChange, disabled }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[14px] font-medium text-ink">
        {field.label}
        {field.required ? <span className="text-brand"> *</span> : null}
      </span>
      <input
        type={field.type}
        name={field.name}
        value={value}
        onChange={onChange}
        required={field.required}
        disabled={disabled}
        placeholder={field.placeholder}
        autoComplete={field.autoComplete}
        className="h-12 w-full rounded-xl border border-hairline bg-white px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-brand disabled:opacity-60"
      />
    </label>
  )
}

export default function LeadForm({
  content,
  fields = DEMO_FIELDS,
  source = 'Demo request',
  messageLabel = 'Anything specific you want to see?',
  messagePlaceholder = 'Fee structure, report card format, transport…',
}) {
  const empty = Object.fromEntries(fields.map((f) => [f.name, '']))
  const [values, setValues] = useState({ ...empty, message: '', website: '' })
  const [state, setState] = useState('idle') // idle | sending | done | error
  const [error, setError] = useState('')

  const update = (name) => (event) =>
    setValues((prev) => ({ ...prev, [name]: event.target.value }))

  async function submit(event) {
    event.preventDefault()
    setState('sending')
    setError('')

    try {
      const response = await fetch(`${API_ROOT}/wp-json/smartshala/v1/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, source }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data?.message || 'Something went wrong. Please try again.')
      }

      setState('done')
    } catch (err) {
      setError(err.message)
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div className="rounded-3xl border border-hairline/70 bg-white p-10 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-brand">
          <CheckCircle2 size={32} />
        </span>
        <h2 className="mt-6 text-[24px] font-bold text-ink">{content?.success_title}</h2>
        <p className="mx-auto mt-3 max-w-[420px] text-[15.5px] leading-[1.65] text-muted">
          {content?.success_body}
        </p>
      </div>
    )
  }

  const sending = state === 'sending'

  return (
    <form onSubmit={submit} className="rounded-3xl border border-hairline/70 bg-white p-8 lg:p-10">
      {content?.title ? (
        <h2 className="text-[22px] font-bold text-ink">{content.title}</h2>
      ) : null}

      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <Field
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={update(field.name)}
            disabled={sending}
          />
        ))}
      </div>

      <label className="mt-5 block">
        <span className="mb-1.5 block text-[14px] font-medium text-ink">{messageLabel}</span>
        <textarea
          name="message"
          rows={4}
          value={values.message}
          onChange={update('message')}
          disabled={sending}
          className="w-full rounded-xl border border-hairline bg-white p-4 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-brand disabled:opacity-60"
          placeholder={messagePlaceholder}
        />
      </label>

      {/* Honeypot — hidden from people, filled by bots. */}
      <input
        type="text"
        name="website"
        value={values.website}
        onChange={update('website')}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {error ? (
        <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-[14px] text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={sending}
        className="press mt-7 inline-flex h-[56px] w-full items-center justify-center rounded-xl bg-brand text-[16.5px] font-semibold text-white hover:bg-brand-hover disabled:opacity-70"
      >
        {sending ? 'Sending…' : content?.submit_label}
      </button>

      {content?.note ? (
        <p className="mt-4 text-center text-[13.5px] text-muted">{content.note}</p>
      ) : null}
    </form>
  )
}
