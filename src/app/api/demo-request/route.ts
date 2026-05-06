import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  firstName: z.string().min(1).max(64),
  lastName: z.string().min(1).max(64),
  companyName: z.string().min(1).max(128),
  workEmail: z.string().email().max(256),
  workPhone: z.string().max(32).optional(),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']),
  primaryInterest: z.enum(['work', 'education', 'life', 'health', 'all']),
  message: z.string().max(1000).optional(),
  locale: z.string().max(10).optional(),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 })
  }

  const result = schema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { success: false, message: 'Validation failed. Please check your inputs.' },
      { status: 422 },
    )
  }

  const { workEmail, companyName } = result.data

  // TODO: Forward to CRM webhook (HubSpot / Salesforce)
  // TODO: Send confirmation email via SendGrid / Resend
  // TODO: Add persistent rate limiting with @vercel/kv or upstash/ratelimit
  console.info('[demo-request]', { email: workEmail, company: companyName })

  return NextResponse.json(
    { success: true, message: 'Thank you! Our team will be in touch within 1 business day.' },
    { status: 201 },
  )
}

export async function GET() {
  return NextResponse.json({ success: false, message: 'Method not allowed.' }, { status: 405 })
}
