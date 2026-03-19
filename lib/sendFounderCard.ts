import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

interface SendOptions {
  toEmail: string
  pdfBytes: Uint8Array
}

export async function sendFounderCard({ toEmail, pdfBytes }: SendOptions) {
  const base64 = Buffer.from(pdfBytes).toString('base64')

  const { data, error } = await resend.emails.send({
    from: 'Sameer Motwani <onboarding@resend.dev>', // Replace with your verified domain sender
    to: [toEmail],
    subject: '🎁 Your Retro Founder Card — From Sameer',
    html: `
      <div style="font-family: monospace; background: #0a0a0a; color: #f5f5f5; padding: 40px; max-width: 500px; margin: 0 auto; border-radius: 12px;">
        <p style="color: #f97316; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 16px;">Birthday Gift</p>
        <h1 style="font-size: 28px; font-weight: 900; color: white; margin-bottom: 16px; line-height: 1.1;">
          Your Retro<br/>Founder Card
        </h1>
        <p style="color: rgba(255,255,255,0.55); font-size: 14px; line-height: 1.7; margin-bottom: 24px;">
          Thank you for the birthday gift! Attached is your exclusive Retro Founder Card — a FIFA-style collector's card featuring Sameer Motwani, Founder Edition.
        </p>
        <p style="color: rgba(255,255,255,0.3); font-size: 11px;">
          — sameermotwani17@gmail.com
        </p>
      </div>
    `,
    attachments: [
      {
        filename: 'SameerMotwani_FounderCard.pdf',
        content: base64,
        contentType: 'application/pdf',
      },
    ],
  })

  if (error) throw new Error(error.message)
  return data
}
