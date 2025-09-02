"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"

interface BabyGamesProps {
    locale: string
}

export default function BabyGames({ locale }: BabyGamesProps) {
    const isTurkish = locale === 'tr'
    const [peekabooVisible, setPeekabooVisible] = useState(true)
    const [giggles, setGiggles] = useState(0)
    const [bubblesPoppedCount, setBubblesPoppedCount] = useState(0)
    const [bubbles, setBubbles] = useState<Array<{id: number, x: number, y: number}>>([])
    const [playTime, setPlayTime] = useState(0)
    const [showDonationReminder, setShowDonationReminder] = useState(false)
    const playTimeRef = useRef(0)
    const [currentGame, setCurrentGame] = useState(0)

    // New games state
    const [memoryCards, setMemoryCards] = useState<Array<{id: number, emoji: string, flipped: boolean, matched: boolean}>>([])
    const [flippedCards, setFlippedCards] = useState<number[]>([])
    const [memoryScore, setMemoryScore] = useState(0)
    const [sequenceGame, setSequenceGame] = useState<number[]>([])
    const [userSequence, setUserSequence] = useState<number[]>([])
    const [sequenceLevel, setSequenceLevel] = useState(1)
    const [showSequence, setShowSequence] = useState(false)

    // Initialize memory game
    const initMemoryGame = () => {
        const emojis = ['👶', '🍼', '🧸', '👶', '🍼', '🧸', '🎀', '⭐', '🎀', '⭐']
        const shuffled = emojis.sort(() => Math.random() - 0.5)
        const cards = shuffled.map((emoji, index) => ({
            id: index,
            emoji,
            flipped: false,
            matched: false
        }))
        setMemoryCards(cards)
        setFlippedCards([])
        setMemoryScore(0)
    }

    // Initialize sequence game
    const generateSequence = () => {
        const newSequence = Array.from({length: sequenceLevel + 2}, () => Math.floor(Math.random() * 4))
        setSequenceGame(newSequence)
        setUserSequence([])
        setShowSequence(true)

        // Show sequence with delay
        setTimeout(() => setShowSequence(false), (newSequence.length * 600) + 1000)
    }

    // Play time tracker
    useEffect(() => {
        const interval = setInterval(() => {
            playTimeRef.current += 1
            setPlayTime(playTimeRef.current)

            // Show donation reminder after 60 seconds
            if (playTimeRef.current === 60 && !showDonationReminder) {
                setShowDonationReminder(true)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [showDonationReminder])

    // Initialize games
    useEffect(() => {
        initMemoryGame()
        generateSequence()
    }, [sequenceLevel]) // eslint-disable-line react-hooks/exhaustive-deps

    // Generate bubbles
    useEffect(() => {
        const interval = setInterval(() => {
            if (bubbles.length < 5) {
                setBubbles(prev => [...prev, {
                    id: Math.random(),
                    x: Math.random() * 80 + 10,
                    y: Math.random() * 80 + 10
                }])
            }
        }, 2000)
        return () => clearInterval(interval)
    }, [bubbles.length])

    // Sound effects
    const playSound = (type: 'giggle' | 'pop' | 'peekaboo' | 'success' | 'match') => {
        if (typeof window !== 'undefined') {
            try {
                const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()

                if (type === 'giggle') {
                    const oscillator = audioContext.createOscillator()
                    const gainNode = audioContext.createGain()

                    oscillator.connect(gainNode)
                    gainNode.connect(audioContext.destination)

                    oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
                    oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1)
                    oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.2)

                    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

                    oscillator.start(audioContext.currentTime)
                    oscillator.stop(audioContext.currentTime + 0.3)
                } else if (type === 'pop') {
                    const oscillator = audioContext.createOscillator()
                    const gainNode = audioContext.createGain()

                    oscillator.connect(gainNode)
                    gainNode.connect(audioContext.destination)

                    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
                    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.1)

                    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

                    oscillator.start(audioContext.currentTime)
                    oscillator.stop(audioContext.currentTime + 0.1)
                } else if (type === 'success') {
                    const oscillator = audioContext.createOscillator()
                    const gainNode = audioContext.createGain()

                    oscillator.connect(gainNode)
                    gainNode.connect(audioContext.destination)

                    oscillator.frequency.setValueAtTime(523, audioContext.currentTime)
                    oscillator.frequency.exponentialRampToValueAtTime(659, audioContext.currentTime + 0.1)
                    oscillator.frequency.exponentialRampToValueAtTime(784, audioContext.currentTime + 0.2)

                    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

                    oscillator.start(audioContext.currentTime)
                    oscillator.stop(audioContext.currentTime + 0.3)
                } else if (type === 'match') {
                    const oscillator = audioContext.createOscillator()
                    const gainNode = audioContext.createGain()

                    oscillator.connect(gainNode)
                    gainNode.connect(audioContext.destination)

                    oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
                    oscillator.frequency.exponentialRampToValueAtTime(554, audioContext.currentTime + 0.15)

                    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime)
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

                    oscillator.start(audioContext.currentTime)
                    oscillator.stop(audioContext.currentTime + 0.2)
                }
            } catch {
                // Silently fail if audio context is not available
            }
        }
    }

    const handlePeekaboo = () => {
        setPeekabooVisible(!peekabooVisible)
        playSound('peekaboo')
    }

    const handleGiggle = () => {
        setGiggles(prev => prev + 1)
        playSound('giggle')
    }

    const popBubble = (id: number) => {
        setBubbles(prev => prev.filter(bubble => bubble.id !== id))
        setBubblesPoppedCount(prev => prev + 1)
        playSound('pop')
    }

    // Memory game functions
    const flipCard = (id: number) => {
        if (flippedCards.length === 2) return
        if (memoryCards[id].flipped || memoryCards[id].matched) return

        const newFlippedCards = [...flippedCards, id]
        setFlippedCards(newFlippedCards)

        setMemoryCards(prev => prev.map(card =>
            card.id === id ? { ...card, flipped: true } : card
        ))

        if (newFlippedCards.length === 2) {
            const [first, second] = newFlippedCards
            if (memoryCards[first].emoji === memoryCards[second].emoji) {
                // Match!
                setTimeout(() => {
                    setMemoryCards(prev => prev.map(card =>
                        card.id === first || card.id === second
                            ? { ...card, matched: true }
                            : card
                    ))
                    setMemoryScore(prev => prev + 1)
                    setFlippedCards([])
                    playSound('match')
                }, 500)
            } else {
                // No match
                setTimeout(() => {
                    setMemoryCards(prev => prev.map(card =>
                        card.id === first || card.id === second
                            ? { ...card, flipped: false }
                            : card
                    ))
                    setFlippedCards([])
                }, 1000)
            }
        }
    }

    // Sequence game functions
    const handleSequenceClick = (index: number) => {
        if (showSequence) return

        const newUserSequence = [...userSequence, index]
        setUserSequence(newUserSequence)

        if (newUserSequence[newUserSequence.length - 1] !== sequenceGame[newUserSequence.length - 1]) {
            // Wrong sequence
            setUserSequence([])
            setTimeout(() => generateSequence(), 1000)
        } else if (newUserSequence.length === sequenceGame.length) {
            // Complete sequence!
            playSound('success')
            setSequenceLevel(prev => prev + 1)
            setUserSequence([])
        }
    }

    const games = [
        {
            name: isTurkish ? "Basit Oyunlar" : "Simple Games",
            component: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Peekaboo Game */}
                    <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl p-4 text-center">
                        <h3 className="text-lg font-semibold mb-3">
                            {isTurkish ? "Cilk Cilk Paaa!" : "Peekaboo!"}
                        </h3>
                        <div
                            className="cursor-pointer transition-all duration-300 hover:scale-110"
                            onClick={handlePeekaboo}
                        >
                            {peekabooVisible ? (
                                <div className="text-6xl">👶</div>
                            ) : (
                                <div className="text-6xl">🙈</div>
                            )}
                        </div>
                        <p className="text-sm mt-2 text-gray-600">
                            {isTurkish ? "Tıkla ve saklan!" : "Click to hide!"}
                        </p>
                    </div>

                    {/* Giggle Counter */}
                    <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-4 text-center">
                        <h3 className="text-lg font-semibold mb-3">
                            {isTurkish ? "Kıkırdama Sayacı" : "Giggle Counter"}
                        </h3>
                        <div
                            className="cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
                            onClick={handleGiggle}
                        >
                            <div className="text-6xl animate-bounce">😄</div>
                            <div className="text-2xl font-bold text-orange-600 mt-2">{giggles}</div>
                        </div>
                        <p className="text-sm mt-2 text-gray-600">
                            {isTurkish ? "Kıkırt beni!" : "Make me giggle!"}
                        </p>
                    </div>

                    {/* Bubble Pop Game */}
                    <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-4 text-center relative overflow-hidden h-40">
                        <h3 className="text-lg font-semibold mb-2">
                            {isTurkish ? "Balon Patlatma" : "Pop Bubbles"}
                        </h3>
                        <div className="text-sm mb-2">
                            {isTurkish ? `Patlatılan: ${bubblesPoppedCount}` : `Popped: ${bubblesPoppedCount}`}
                        </div>
                        {bubbles.map(bubble => (
                            <div
                                key={bubble.id}
                                className="absolute w-8 h-8 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full cursor-pointer animate-bounce hover:scale-110 transition-all"
                                style={{
                                    left: `${bubble.x}%`,
                                    top: `${bubble.y}%`,
                                    animation: `bounce 2s infinite, float 3s ease-in-out infinite`
                                }}
                                onClick={() => popBubble(bubble.id)}
                            >
                                <div className="w-full h-full rounded-full bg-gradient-to-t from-transparent via-white/30 to-white/60 flex items-center justify-center text-xs">
                                    💫
                                </div>
                            </div>
                        ))}
                        {bubbles.length === 0 && (
                            <div className="text-gray-500 text-sm mt-4">
                                {isTurkish ? "Balonlar geliyor..." : "Bubbles coming..."}
                            </div>
                        )}
                    </div>
                </div>
            )
        },
        {
            name: isTurkish ? "Hafıza Oyunu" : "Memory Game",
            component: (
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">
                            {isTurkish ? "Eşleştir!" : "Match Pairs!"}
                        </h3>
                        <div className="text-sm">
                            {isTurkish ? `Eşleşen: ${memoryScore}/5` : `Matches: ${memoryScore}/5`}
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        {memoryCards.map((card) => (
                            <div
                                key={card.id}
                                className={`aspect-square rounded-lg flex items-center justify-center text-2xl cursor-pointer transition-all duration-300 ${
                                    card.flipped || card.matched
                                        ? 'bg-white shadow-md'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                } ${card.matched ? 'opacity-50' : ''}`}
                                onClick={() => flipCard(card.id)}
                            >
                                {card.flipped || card.matched ? card.emoji : '?'}
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={initMemoryGame}
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all text-sm"
                    >
                        {isTurkish ? "Yeniden Başla" : "Restart"}
                    </button>
                </div>
            )
        },
        {
            name: isTurkish ? "Simon Oyunu" : "Simon Says",
            component: (
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">
                            {isTurkish ? "Sırayı Takip Et!" : "Follow the Sequence!"}
                        </h3>
                        <div className="text-sm">
                            {isTurkish ? `Seviye: ${sequenceLevel}` : `Level: ${sequenceLevel}`}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {[0, 1, 2, 3].map((index) => {
                            const colors = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400']
                            const isActive = showSequence && sequenceGame.includes(index)
                            const isUserActive = userSequence.includes(index)

                            return (
                                <div
                                    key={index}
                                    className={`aspect-square rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center text-2xl ${colors[index]} ${
                                        isActive || isUserActive ? 'scale-110 brightness-125' : 'hover:scale-105'
                                    }`}
                                    onClick={() => handleSequenceClick(index)}
                                >
                                    {['🔴', '🔵', '🟢', '🟡'][index]}
                                </div>
                            )
                        })}
                    </div>
                    <div className="text-center">
                        {showSequence ? (
                            <p className="text-sm text-purple-600">
                                {isTurkish ? "Sırayı izle..." : "Watch the sequence..."}
                            </p>
                        ) : (
                            <p className="text-sm text-purple-600">
                                {isTurkish ? "Şimdi tekrarla!" : "Now repeat it!"}
                            </p>
                        )}
                    </div>
                </div>
            )
        }
    ]

    return (
        <div className="space-y-6">
            {/* Donation Reminder Modal */}
            {showDonationReminder && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md text-center animate-bounce">
                        <div className="text-6xl mb-4">👶</div>
                        <h3 className="text-xl font-bold mb-2">
                            {isTurkish ? "Hoop! Yeter oynadın!" : "Whoa! Enough playing!"}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            {isTurkish
                                ? "1 dakikadır oynuyorsun! Artık bana bir hediye gönderme zamanı geldi sanırım 😄"
                                : "You've been playing for 1 minute! I think it's time to send me a gift 😄"}
                        </p>
                        <div className="flex gap-3 justify-center">
                            <Link
                                href={`/${locale}/donate/umay`}
                                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all text-sm"
                            >
                                {isTurkish ? "Tamam, hediye göndereceğim! 🎁" : "Ok, I'll send a gift! 🎁"}
                            </Link>
                            <button
                                onClick={() => setShowDonationReminder(false)}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all text-sm"
                            >
                                {isTurkish ? "Biraz daha oyun! 😅" : "Just a bit more gaming! 😅"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-bold">
                    {isTurkish ? "🎮 Umay'ın Oyun Merkezi" : "🎮 Umay's Game Center"}
                </h2>
                <div className="text-sm text-gray-500">
                    {isTurkish ? `Oyun süresi: ${Math.floor(playTime / 60)}:${(playTime % 60).toString().padStart(2, '0')}` : `Play time: ${Math.floor(playTime / 60)}:${(playTime % 60).toString().padStart(2, '0')}`}
                </div>
            </div>

            {/* Game Tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto">
                {games.map((game, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentGame(index)}
                        className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap text-sm ${
                            currentGame === index
                                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {game.name}
                    </button>
                ))}
            </div>

            {/* Current Game */}
            {games[currentGame].component}

            {/* Game Stats */}
            <div className="bg-white rounded-xl p-4 shadow-md">
                <h4 className="font-semibold mb-2">
                    {isTurkish ? "🏆 Oyun İstatistikleri" : "🏆 Game Stats"}
                </h4>
                <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold text-pink-600">{giggles}</div>
                        <div className="text-xs text-gray-600">
                            {isTurkish ? "Kıkırdama" : "Giggles"}
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-blue-600">{bubblesPoppedCount}</div>
                        <div className="text-xs text-gray-600">
                            {isTurkish ? "Balon" : "Bubbles"}
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-green-600">{memoryScore}</div>
                        <div className="text-xs text-gray-600">
                            {isTurkish ? "Eşleşme" : "Memory"}
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-purple-600">{sequenceLevel}</div>
                        <div className="text-xs text-gray-600">
                            {isTurkish ? "Simon Lv." : "Simon Lv."}
                        </div>
                    </div>
                </div>
            </div>

            {/* More Games Link */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 text-center">
                <h3 className="text-lg font-bold mb-2">
                    {isTurkish ? "🎮 Daha Fazla Oyun İster Misin?" : "🎮 Want More Games?"}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                    {isTurkish
                        ? "Süper oyun salonuma gel! Daha fazla eğlenceli oyun seni bekliyor!"
                        : "Come to my super game arcade! More fun games are waiting for you!"}
                </p>
                <Link
                    href={`/${locale}/games`}
                    className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all text-sm font-semibold"
                >
                    {isTurkish ? "🚀 Oyun Salonuna Git" : "🚀 Go to Game Arcade"}
                </Link>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
        </div>
    )
}