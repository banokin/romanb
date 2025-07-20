import { useState, useEffect } from 'react'

interface DIDCredits {
  remaining: number
  total: number
  used: number
}

export function useDIDCredits() {
  const [credits, setCredits] = useState<DIDCredits | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCredits() {
      try {
        setLoading(true)
        const response = await fetch('/api/did/credits')
        
        if (!response.ok) {
          throw new Error('Failed to fetch credits')
        }
        
        const data = await response.json()
        setCredits(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        // Fallback to default credits for development
        setCredits({
          remaining: 1000,
          total: 1000,
          used: 0
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCredits()
  }, [])

  return {
    credits,
    loading,
    error,
    refetch: () => {
      setLoading(true)
      setError(null)
      fetch('/api/did/credits')
        .then(res => res.json())
        .then(data => setCredits(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))
    }
  }
} 