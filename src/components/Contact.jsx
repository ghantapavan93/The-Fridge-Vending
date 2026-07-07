import { useState } from 'react'
import { BRAND, LOCATION_TYPES } from '../lib/content'
import Reveal from './ui/Reveal'
import SplitHeading from './ui/SplitHeading'
import Icon from './ui/Icon'

const EMPTY = {
  name: '',
  business: '',
  phone: '',
  email: '',
  locationType: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [sent, setSent] = useState(false)
  const [touched, setTouched] = useState(false)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const valid = form.name.trim() && (form.phone.trim() || form.email.trim())

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched(true)
    if (!valid) return

    // No backend yet: open the visitor's email client with everything prefilled.
    // TODO: swap for a form endpoint (Netlify Forms / Formspree) once the
    // official inbox is live — see README.
    const subject = encodeURIComponent(`Free Placement Request: ${form.business || form.name}`)
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Business / Property: ${form.business}`,
        `Phone: ${form.phone}`,
        `Email: ${form.email}`,
        `Location type: ${form.locationType}`,
        '',
        'Message:',
        form.message,
      ].join('\n')
    )
    window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const field =
    'w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-navy-900 placeholder:text-ink/35 outline-none transition-colors focus:border-sky-500'

  return (
    <section id="contact" className="relative bg-white py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left: pitch + contact */}
          <div>
            <span className="eyebrow mb-4">Get Started</span>
            <SplitHeading
              text="Interested? Tell us about your location."
              accentWords={['location.']}
              className="text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl md:text-5xl"
            />
            <p className="mt-5 max-w-md text-base text-ink/70 md:text-lg">
              Share a few details and we’ll follow up with next steps. Placement is free, and there’s
              no obligation. We’ll simply see if The Fridge is a good fit for your space.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={BRAND.phoneHref}
                className="flex items-center gap-4 rounded-2xl border border-line bg-cloud px-5 py-4 transition-colors hover:border-sky-500"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky-500/15 text-sky-500">
                  <Icon name="phone" size={20} />
                </span>
                <span>
                  <span className="block text-sm text-ink/55">Call {BRAND.contactName}, {BRAND.contactTitle}</span>
                  <span className="text-lg font-bold text-navy-900">{BRAND.phone}</span>
                </span>
              </a>
              <div className="flex items-center gap-4 rounded-2xl border border-line bg-cloud px-5 py-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-fresh-500/15 text-fresh-500">
                  <Icon name="snowflake" size={20} />
                </span>
                <span>
                  <span className="block text-sm text-ink/55">Online</span>
                  <span className="text-lg font-bold text-navy-900">{BRAND.domain}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <Reveal variant="up" className="relative">
            <div className="glass rounded-[2rem] p-6 md:p-8">
              {sent ? (
                <div className="flex min-h-[26rem] flex-col items-center justify-center text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-fresh-500 text-white">
                    <Icon name="check" size={30} strokeWidth={2.6} />
                  </span>
                  <h3 className="mt-5 text-2xl font-bold text-navy-900">Request ready to send!</h3>
                  <p className="mt-2 max-w-sm text-ink/65">
                    Your email app should have opened with the details filled in. Prefer to talk now?
                    Call {BRAND.contactName} at{' '}
                    <a className="font-semibold text-sky-500" href={BRAND.phoneHref}>
                      {BRAND.phone}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSent(false); setForm(EMPTY); setTouched(false) }}
                    className="btn btn-ghost mt-6"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-navy-900">Name *</span>
                      <input className={field} value={form.name} onChange={update('name')} placeholder="Jane Doe" autoComplete="name" />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-navy-900">Business / Property</span>
                      <input className={field} value={form.business} onChange={update('business')} placeholder="Sunrise Auto / Oakwood Apts" autoComplete="organization" />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-navy-900">Phone</span>
                      <input className={field} value={form.phone} onChange={update('phone')} placeholder="(512) 000-0000" type="tel" autoComplete="tel" />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-navy-900">Email</span>
                      <input className={field} value={form.email} onChange={update('email')} placeholder="you@company.com" type="email" autoComplete="email" />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-navy-900">Location type</span>
                    <select className={`${field} appearance-none`} value={form.locationType} onChange={update('locationType')}>
                      <option value="">Select one…</option>
                      {LOCATION_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-navy-900">Message</span>
                    <textarea className={`${field} min-h-28 resize-y`} value={form.message} onChange={update('message')} placeholder="Tell us about your space, foot traffic, and what people might want stocked." />
                  </label>

                  {touched && !valid && (
                    <p className="text-sm font-medium text-cherry-500">
                      Please add your name and at least a phone or email so we can reach you.
                    </p>
                  )}

                  <button type="submit" className="btn btn-primary w-full !py-4">
                    Send Request <Icon name="arrow" size={18} />
                  </button>

                  <div className="mt-1 flex items-center gap-3 rounded-2xl border border-line bg-cloud px-4 py-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sky-500/15 text-sky-500">
                      <Icon name="phone" size={17} />
                    </span>
                    <p className="text-sm text-ink/75">
                      Prefer to talk now? Call {BRAND.contactName}, {BRAND.contactTitle}, at{' '}
                      <a href={BRAND.phoneHref} className="font-bold text-navy-900 hover:text-sky-500">
                        {BRAND.phone}
                      </a>
                      .
                    </p>
                  </div>

                  <p className="text-center text-xs text-ink/50">
                    Free placement · No obligation · We reply within one business day.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
