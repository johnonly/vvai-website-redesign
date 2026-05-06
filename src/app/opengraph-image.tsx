import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'VV AI — Redefining Connections, Acting on Your Words'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0A0E1A 0%, #0F1628 50%, #0A1628 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '-150px',
          right: '-100px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,140,255,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          left: '-50px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)',
        }}
      />

      {/* Logo mark */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '40px',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #4F8CFF, #8B5CF6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            fontWeight: 800,
            color: 'white',
            fontFamily: 'sans-serif',
          }}
        >
          VV
        </div>
        <span
          style={{
            fontSize: '36px',
            fontWeight: 700,
            color: 'white',
            fontFamily: 'sans-serif',
            letterSpacing: '-0.5px',
          }}
        >
          V V AI
        </span>
      </div>

      {/* Headline */}
      <div
        style={{
          fontSize: '56px',
          fontWeight: 800,
          color: 'white',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          lineHeight: 1.15,
          letterSpacing: '-1px',
          maxWidth: '900px',
          marginBottom: '24px',
        }}
      >
        Redefining Connections,
        <br />
        <span
          style={{
            background: 'linear-gradient(90deg, #4F8CFF, #8B5CF6)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Acting on Your Words
        </span>
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: '22px',
          color: 'rgba(255,255,255,0.60)',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          maxWidth: '700px',
          lineHeight: 1.5,
          marginBottom: '48px',
        }}
      >
        AI-powered platform for Work · Education · Life · Health
      </div>

      {/* Cert badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(79,140,255,0.12)',
          border: '1px solid rgba(79,140,255,0.30)',
          borderRadius: '9999px',
          padding: '10px 24px',
        }}
      >
        <span style={{ fontSize: '18px', color: '#4F8CFF', fontFamily: 'sans-serif' }}>✓</span>
        <span
          style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', fontFamily: 'sans-serif' }}
        >
          ISO 27001 Certified · GDPR Compliant
        </span>
      </div>

      {/* Domain */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          right: '48px',
          fontSize: '16px',
          color: 'rgba(255,255,255,0.35)',
          fontFamily: 'sans-serif',
        }}
      >
        www.vvai.com
      </div>
    </div>,
    { width: 1200, height: 630 },
  )
}
