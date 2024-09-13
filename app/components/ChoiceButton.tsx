import Image from 'next/image'

interface ChoiceButtonProps {
  choice: string
  onClick: (choice: string) => void
}

export default function ChoiceButton({ choice, onClick }: ChoiceButtonProps) {
  const getImageSrc = (choice: string) => {
    switch (choice) {
      case 'rock':
        return 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fist-XodSbsTkP6Lm2y3kG8MuMv7309a3a6.png'
      case 'paper':
        return 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hand-TO9kyL5HHZpk6BvJ7evNflqgbaWaMW.png'
      case 'scissors':
        return 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/letter-v-qZ3KXFJllVR5UlmJUltKLV7gjfkwtr.png'
      default:
        return ''
    }
  }

  return (
    <button
      onClick={() => onClick(choice)}
      className="w-full px-6 py-3 text-lg font-semibold text-white bg-[#8B89E6] rounded-lg hover:bg-[#7A78D4] transition-colors flex items-center justify-center"
    >
      <div className="w-8 h-8 mr-4 flex items-center justify-center">
        <Image
          src={getImageSrc(choice)}
          alt={choice}
          width={32}
          height={32}
          className="object-contain"
        />
      </div>
      <span>{choice.charAt(0).toUpperCase() + choice.slice(1)}</span>
    </button>
  )
}