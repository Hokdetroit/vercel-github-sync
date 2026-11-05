'use client'

import { useState, type FormEvent } from 'react'
import { ArrowIcon } from './link-button'
import styles from './site.module.css'

const BUSINESS_TYPES = ['Healthcare practice', 'Mortgage or real estate', 'Agency or consultant', 'Home services', 'Other']
const INTERESTS = ['Core Platform', 'AI and Automation', 'Workforce', 'Medical Suite', 'Custom build']

export function LeadForm({ variant }: { variant: 'demo' | 'contact' }) {
  const [submitted, setSubmitted] = useState(false)
  const isDemo = variant === 'demo'
  const prefix = `${variant}-`

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const payload = { ...Object.fromEntries(data.entries()), interests: data.getAll('interests') }
    // TODO: connect to Studio Escrow CRM pipeline
    console.log(`[${variant} form] placeholder submission`, payload)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={styles.success} role="status" aria-live="polite">
        <h2 className="ma3IoW_h4">Thank you. We received your details.</h2>
        <p className="ma3IoW_bodyM ma3IoW_grey">
          {isDemo
            ? 'The Studio Escrow team will reach out to schedule your demo.'
            : 'The Studio Escrow team will get back to you.'}
        </p>
        <button type="button" className={styles.textButton} onClick={() => setSubmitted(false)}>
          Send another response
        </button>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} aria-label={isDemo ? 'Book a demo' : 'Contact Studio Escrow'}>
      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${prefix}name`}>
            Full name
          </label>
          <input className={styles.input} id={`${prefix}name`} name="fullName" autoComplete="name" required />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${prefix}email`}>
            {isDemo ? 'Work email' : 'Email'}
          </label>
          <input className={styles.input} id={`${prefix}email`} name="email" type="email" autoComplete="email" required />
        </div>
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${prefix}phone`}>
            Phone <span className={styles.optional}>(optional)</span>
          </label>
          <input className={styles.input} id={`${prefix}phone`} name="phone" type="tel" autoComplete="tel" />
        </div>
        {isDemo ? (
          <div className={styles.field}>
            <label className={styles.label} htmlFor={`${prefix}business`}>
              Business name
            </label>
            <input className={styles.input} id={`${prefix}business`} name="businessName" autoComplete="organization" required />
          </div>
        ) : null}
      </div>

      {isDemo ? (
        <>
          <div className={styles.field}>
            <label className={styles.label} htmlFor={`${prefix}type`}>
              Business type
            </label>
            <select className={styles.input} id={`${prefix}type`} name="businessType" required defaultValue="">
              <option value="" disabled>
                Select your business type
              </option>
              {BUSINESS_TYPES.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <fieldset className={styles.fieldset}>
            <legend className={styles.label}>
              What are you interested in? <span className={styles.optional}>(select any)</span>
            </legend>
            <div className={styles.checkGrid}>
              {INTERESTS.map((interest) => (
                <label key={interest} className={styles.check}>
                  <input type="checkbox" name="interests" value={interest} />
                  <span>{interest}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </>
      ) : null}

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${prefix}message`}>
          {isDemo ? 'Short message' : 'Message'} {isDemo ? <span className={styles.optional}>(optional)</span> : null}
        </label>
        <textarea
          className={styles.input}
          id={`${prefix}message`}
          name="message"
          rows={4}
          maxLength={1000}
          required={!isDemo}
          aria-describedby={`${prefix}phi-note`}
        />
      </div>

      <p className={styles.note} id={`${prefix}phi-note`}>
        <strong>Please do not include patient or health information in this form.</strong>
      </p>

      <label className={styles.check}>
        <input type="checkbox" name="consent" value="yes" required />
        <span>I agree to be contacted by Studio Escrow about my inquiry by email or phone.</span>
      </label>

      <button type="submit" className={`ma3IoW_link ma3IoW_link_pill ${styles.submit}`}>
        <span>{isDemo ? 'Book a demo' : 'Send message'}</span>
        <span className="ma3IoW_linkIcon">
          <ArrowIcon />
        </span>
      </button>
    </form>
  )
}
