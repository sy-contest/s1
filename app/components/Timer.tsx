'use client'

import { useState, useEffect } from 'react'

interface TimerProps {
  onTimeUp: () => void
}

export default function Timer({ onTimeUp }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(30) // 30 seconds

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="text-4xl font-bold text-white">
      {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </div>
  )
}