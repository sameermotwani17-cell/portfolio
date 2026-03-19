'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface Props {
  onClose: () => void
}

export default function GiftModal({ onClose }: Props) {
  const [email, setEmail]     = useState('')
  const [amount, setAmount]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleSend = async () => {
    setError('')
    const amt = parseFloat(amount)
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email.')
      return
    }
    if (!amt || amt < 1) {
      setError('Minimum gift is $1.')
      return
    }

    const paypalLink = process.env.NEXT_PUBLIC_PAYPAL_LINK
    if (!paypalLink) {
      setError('Payment link is not configured.')
      return
    }

    setLoading(true)
    try {
      const url = new URL(paypalLink)
      url.searchParams.set('email', email)
      url.searchParams.set('amount', amt.toString())
      window.location.href = url.toString()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred.')
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50"
        style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      />

      {/* Card */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed z-50 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 md:w-[480px] rounded-2xl p-8"
        style={{
          background: 'linear-gradient(135deg, rgba(20,20,20,0.98) 0%, rgba(15,15,15,0.98) 100%)',
          border: '1px solid rgba(249,115,22,0.25)',
          boxShadow: '0 0 60px rgba(249,115,22,0.12), 0 20px 60px rgba(0,0,0,0.8)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/30 hover:text-white/70 transition-colors duration-200 font-body text-sm"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-body tracking-[0.35em] uppercase mb-2" style={{ color: '#f97316' }}>
            Birthday gift
          </p>
          <h2 className="font-display text-3xl text-white font-bold leading-tight">
            Send a gift<br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #f97316, #3b82f6)' }}
            >
              get a Founder Card.
            </span>
          </h2>
          <p className="text-white/40 font-body text-sm mt-3 leading-relaxed">
            A retro FIFA-style Founder Card — PDF — will be emailed to you after payment.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-white/40 font-body text-xs tracking-[0.15em] uppercase mb-2">
              Your email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3.5 rounded-xl font-body text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(249,115,22,0.5)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>

          <div>
            <label className="block text-white/40 font-body text-xs tracking-[0.15em] uppercase mb-2">
              Gift amount (USD)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-body text-sm">$</span>
              <input
                type="number"
                min="1"
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="10"
                className="w-full pl-8 pr-4 py-3.5 rounded-xl font-body text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(249,115,22,0.5)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 font-body text-xs">{error}</p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSend}
            disabled={loading}
            className="w-full py-4 rounded-xl font-body text-xs tracking-[0.2em] uppercase font-semibold transition-opacity duration-200 disabled:opacity-50"
            style={{ backgroundColor: '#f97316', color: 'white' }}
          >
            {loading ? 'Redirecting...' : 'Send Gift 🎁'}
          </motion.button>
        </div>

        {/* Powered by */}
        <p className="text-white/15 font-body text-xs text-center mt-5 tracking-wide">
          Redirects to PayPal · Secure payment
        </p>
      </motion.div>
    </AnimatePresence>
  )
}
