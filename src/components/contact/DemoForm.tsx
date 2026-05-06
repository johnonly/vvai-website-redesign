'use client'

import Button from '@/components/ui/Button'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

interface FormState {
  firstName: string
  lastName: string
  companyName: string
  workEmail: string
  workPhone: string
  companySize: string
  primaryInterest: string
  message: string
}

const INITIAL: FormState = {
  firstName: '',
  lastName: '',
  companyName: '',
  workEmail: '',
  workPhone: '',
  companySize: '',
  primaryInterest: '',
  message: '',
}

interface DemoFormProps {
  submitLabel: string
}

export default function DemoForm({ submitLabel }: DemoFormProps) {
  const t = useTranslations('form')
  const [form, setForm] = useState<FormState>(INITIAL)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = (await res.json()) as { success: boolean; message: string }
      if (res.ok) {
        setStatus('success')
        setForm(INITIAL)
      } else {
        setStatus('error')
        setErrorMsg(data.message ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg(t('networkError'))
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-green-500/30 bg-green-500/10 p-12 text-center">
        <svg
          className="h-12 w-12 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-text-primary text-xl font-bold">{t('successTitle')}</h3>
        <p className="text-text-secondary">{t('successBody')}</p>
        <button
          className="text-brand-blue mt-2 text-sm underline underline-offset-2"
          onClick={() => setStatus('idle')}
        >
          {t('submitAnother')}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* Name row */}
      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-text-secondary text-xs font-semibold tracking-wide uppercase">
            {t('firstName')} <span className="text-brand-blue">*</span>
          </span>
          <input
            name="firstName"
            type="text"
            value={form.firstName}
            onChange={handleChange}
            required
            maxLength={64}
            autoComplete="given-name"
            className="input-field"
            placeholder={t('firstNamePlaceholder')}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-text-secondary text-xs font-semibold tracking-wide uppercase">
            {t('lastName')} <span className="text-brand-blue">*</span>
          </span>
          <input
            name="lastName"
            type="text"
            value={form.lastName}
            onChange={handleChange}
            required
            maxLength={64}
            autoComplete="family-name"
            className="input-field"
            placeholder={t('lastNamePlaceholder')}
          />
        </label>
      </div>

      {/* Company */}
      <label className="flex flex-col gap-1.5">
        <span className="text-text-secondary text-xs font-semibold tracking-wide uppercase">
          {t('companyName')} <span className="text-brand-blue">*</span>
        </span>
        <input
          name="companyName"
          type="text"
          value={form.companyName}
          onChange={handleChange}
          required
          maxLength={128}
          autoComplete="organization"
          className="input-field"
          placeholder={t('companyPlaceholder')}
        />
      </label>

      {/* Work email */}
      <label className="flex flex-col gap-1.5">
        <span className="text-text-secondary text-xs font-semibold tracking-wide uppercase">
          {t('workEmail')} <span className="text-brand-blue">*</span>
        </span>
        <input
          name="workEmail"
          type="email"
          value={form.workEmail}
          onChange={handleChange}
          required
          maxLength={256}
          autoComplete="email"
          className="input-field"
          placeholder={t('emailPlaceholder')}
        />
      </label>

      {/* Work phone */}
      <label className="flex flex-col gap-1.5">
        <span className="text-text-secondary text-xs font-semibold tracking-wide uppercase">
          {t('workPhone')}{' '}
          <span className="text-text-muted font-normal normal-case">({t('optional')})</span>
        </span>
        <input
          name="workPhone"
          type="tel"
          value={form.workPhone}
          onChange={handleChange}
          maxLength={32}
          autoComplete="tel"
          className="input-field"
          placeholder={t('phonePlaceholder')}
        />
      </label>

      {/* Company size + Primary interest */}
      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-text-secondary text-xs font-semibold tracking-wide uppercase">
            {t('companySize')} <span className="text-brand-blue">*</span>
          </span>
          <select
            name="companySize"
            value={form.companySize}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="">{t('selectDefault')}</option>
            <option value="1-10">{t('companySizeOptions.1_10')}</option>
            <option value="11-50">{t('companySizeOptions.11_50')}</option>
            <option value="51-200">{t('companySizeOptions.51_200')}</option>
            <option value="201-500">{t('companySizeOptions.201_500')}</option>
            <option value="500+">{t('companySizeOptions.500plus')}</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-text-secondary text-xs font-semibold tracking-wide uppercase">
            {t('primaryInterest')} <span className="text-brand-blue">*</span>
          </span>
          <select
            name="primaryInterest"
            value={form.primaryInterest}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="">{t('selectDefault')}</option>
            <option value="work">{t('interestOptions.work')}</option>
            <option value="education">{t('interestOptions.education')}</option>
            <option value="life">{t('interestOptions.life')}</option>
            <option value="health">{t('interestOptions.health')}</option>
            <option value="all">{t('interestOptions.all')}</option>
          </select>
        </label>
      </div>

      {/* Message */}
      <label className="flex flex-col gap-1.5">
        <span className="text-text-secondary text-xs font-semibold tracking-wide uppercase">
          {t('message')}{' '}
          <span className="text-text-muted font-normal normal-case">({t('optional')})</span>
        </span>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          maxLength={1000}
          className="input-field"
          placeholder={t('messagePlaceholder')}
        />
      </label>

      {/* Error message */}
      {status === 'error' && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === 'submitting'}
        className="mt-1 w-full"
      >
        {status === 'submitting' ? t('submitting') : submitLabel}
      </Button>

      <p className="text-text-muted text-center text-xs">
        {t('bySubmitting')}{' '}
        <a href="/terms" className="text-brand-blue hover:underline">
          {t('termsLink')}
        </a>{' '}
        {t('and')}{' '}
        <a href="/privacy" className="text-brand-blue hover:underline">
          {t('privacyLink')}
        </a>
        .
      </p>
    </form>
  )
}
