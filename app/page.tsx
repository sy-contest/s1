'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Timer from './components/Timer'
import ChoiceButton from './components/ChoiceButton'
import ConfirmationModal from './components/ConfirmationModal'
import LoadingScreen from './components/LoadingScreen'

const ReactConfetti = dynamic(() => import('react-confetti'), { ssr: false })

const choices = ['rock', 'paper', 'scissors']

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)
  const [botChoice, setBotChoice] = useState<string | null>(null)
  const [botThinking, setBotThinking] = useState(true)
  const [playerScore, setPlayerScore] = useState(0)
  const [botScore, setBotScore] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [roundKey, setRoundKey] = useState(0)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (playerScore === 3) {
      setWinner('Player')
    } else if (botScore === 3) {
      setWinner('Bot')
    }
  }, [playerScore, botScore])

  useEffect(() => {
    if (gameStarted) {
      const timer = setTimeout(() => {
        const randomChoice = choices[Math.floor(Math.random() * choices.length)]
        setBotChoice(randomChoice)
        setBotThinking(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [roundKey, gameStarted])

  const handleChoiceClick = (choice: string) => {
    setSelectedChoice(choice)
    setShowModal(true)
  }

  const handleConfirm = () => {
    setShowModal(false)
    if (botChoice && selectedChoice) {
      if (
        (selectedChoice === 'rock' && botChoice === 'scissors') ||
        (selectedChoice === 'paper' && botChoice === 'rock') ||
        (selectedChoice === 'scissors' && botChoice === 'paper')
      ) {
        setPlayerScore(prevScore => {
          const newScore = prevScore + 1
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 4000)
          return newScore
        })
      } else if (selectedChoice !== botChoice) {
        setBotScore(prevScore => prevScore + 1)
      }
    }
    resetRound()
  }

  const resetRound = () => {
    setBotChoice(null)
    setBotThinking(true)
    setSelectedChoice(null)
    setRoundKey(prevKey => prevKey + 1)
  }

  const handleTimeUp = useCallback(() => {
    setBotScore(prevScore => prevScore + 1)
    resetRound()
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!gameStarted) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#9999FF]">
        <button
          onClick={() => setGameStarted(true)}
          className="px-6 py-3 text-lg font-semibold text-white bg-[#8B89E6] rounded-lg hover:bg-[#7A78D4] transition-colors"
        >
          Practice against bot
        </button>
      </div>
    )
  }

  if (winner) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#9999FF]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="p-8 bg-white shadow-lg text-center"
        >
          <h2 className="text-3xl font-bold mb-4">{winner} wins!</h2>
          <p className="text-xl">Final Score:</p>
          <p className="text-lg">Player: {playerScore} - Bot: {botScore}</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col relative overflow-hidden bg-[#9999FF]">
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          initialVelocityY={15}
          tweenDuration={4000}
        />
      )}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-semibold mb-4 text-white">
            {botThinking ? "The bot is thinking..." : "The bot has selected a choice"}
          </p>
          <p className="text-xl font-bold text-white">Bot Score: {botScore}/3</p>
        </div>
      </div>
      <div className="w-full h-2 bg-[#8B89E6]"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="bg-[#9999FF] p-4">
          <Timer key={roundKey} onTimeUp={handleTimeUp} />
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="text-xl font-bold text-white mb-4">Player Score: {playerScore}/3</p>
        <div className="space-y-4">
          {choices.map((choice) => (
            <ChoiceButton key={choice} choice={choice} onClick={handleChoiceClick} />
          ))}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <ConfirmationModal
            choice={selectedChoice!}
            onConfirm={handleConfirm}
            onCancel={() => setShowModal(false)}
          />
        </div>
      )}
    </div>
  )
}