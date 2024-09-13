import Image from 'next/image'

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#9999FF]">
      <div className="relative w-64 h-64">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b557a2913a51305a1c70387f00bd9cb6-ezgif.com-effects%20(2)-ZLdR1ujXxyKj6l4O1kqMJp2lJ75Fsy.gif"
          alt="Rock Paper Scissors Loading Animation"
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
      <p className="mt-4 text-3xl font-bold text-white animate-flash">
        Loading
      </p>
    </div>
  )
}