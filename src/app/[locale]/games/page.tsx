"use client"
import { useState, useEffect, useRef, use } from "react"
import Link from "next/link"
import { ChevronLeft, Trophy, Gamepad2, Zap, Timer } from "lucide-react"

export default function MoreGamesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = use(params)
    const isTurkish = locale === 'tr'

    // Drawing Game State
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [drawingScore, setDrawingScore] = useState(0)
    const [currentColor, setCurrentColor] = useState('#FF69B4')

    // Rhythm Game State
    const [rhythmScore, setRhythmScore] = useState(0)
    const [rhythmPattern, setRhythmPattern] = useState<boolean[]>([])
    const [userRhythm, setUserRhythm] = useState<boolean[]>([])
    const [isPlaying, setIsPlaying] = useState(false)

    // Shape Matcher State  
    const [targetShape, setTargetShape] = useState('circle')
    const [shapeScore, setShapeScore] = useState(0)
    const [shapeTimer, setShapeTimer] = useState(30)

    // Baby Sound Game
    const [soundSequence, setSoundSequence] = useState<string[]>([])
    const [userSoundSequence, setUserSoundSequence] = useState<string[]>([])
    const [soundScore, setSoundScore] = useState(0)
    const [playingSound, setPlayingSound] = useState<string | null>(null)

    // Reaction Game
    const [reactionActive, setReactionActive] = useState(false)
    const [reactionStart, setReactionStart] = useState(0)
    const [reactionTime, setReactionTime] = useState<number | null>(null)
    const [bestReaction, setBestReaction] = useState<number | null>(null)

    // Color Match Game
    const [colorGrid, setColorGrid] = useState<string[][]>([])
    const [targetColor, setTargetColor] = useState('#FF69B4')
    const [colorMatchScore, setColorMatchScore] = useState(0)
    const [colorTimeLeft, setColorTimeLeft] = useState(45)

    // Total gameplay time
    const [totalPlayTime, setTotalPlayTime] = useState(0)
    const [showAchievement, setShowAchievement] = useState<string | null>(null)

    // Sound effects
    const playSound = (type: 'success' | 'fail' | 'perfect' | 'baby' | 'click' | 'draw') => {
        if (typeof window !== 'undefined') {
            try {
                const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
                const oscillator = audioContext.createOscillator()
                const gainNode = audioContext.createGain()

                oscillator.connect(gainNode)
                gainNode.connect(audioContext.destination)

                switch(type) {
                    case 'success':
                        oscillator.frequency.setValueAtTime(523, audioContext.currentTime)
                        oscillator.frequency.exponentialRampToValueAtTime(659, audioContext.currentTime + 0.1)
                        break
                    case 'fail':
                        oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
                        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2)
                        break
                    case 'perfect':
                        oscillator.frequency.setValueAtTime(523, audioContext.currentTime)
                        oscillator.frequency.exponentialRampToValueAtTime(784, audioContext.currentTime + 0.2)
                        oscillator.frequency.exponentialRampToValueAtTime(1047, audioContext.currentTime + 0.3)
                        break
                    case 'baby':
                        oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
                        oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1)
                        oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.2)
                        break
                    case 'click':
                        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime)
                        break
                    case 'draw':
                        oscillator.frequency.setValueAtTime(440 + Math.random() * 200, audioContext.currentTime)
                        break
                }

                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

                oscillator.start(audioContext.currentTime)
                oscillator.stop(audioContext.currentTime + 0.2)
            } catch {
                // Silently fail
            }
        }
    }

    // Drawing functions
    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(true)
        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.beginPath()
        ctx.moveTo(x, y)
        playSound('draw')
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return

        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.strokeStyle = currentColor
        ctx.lineWidth = 5
        ctx.lineCap = 'round'
        ctx.lineTo(x, y)
        ctx.stroke()

        setDrawingScore(prev => prev + 1)
    }

    const stopDrawing = () => {
        setIsDrawing(false)
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        setDrawingScore(0)
    }

    // Rhythm game functions
    const generateRhythmPattern = () => {
        const pattern = Array.from({ length: 8 }, () => Math.random() > 0.5)
        setRhythmPattern(pattern)
        setUserRhythm([])
        setIsPlaying(true)

        // Play the pattern
        pattern.forEach((beat, index) => {
            setTimeout(() => {
                if (beat) playSound('click')
                setPlayingSound(beat ? 'beat' : null)
                setTimeout(() => setPlayingSound(null), 200)
            }, index * 500)
        })

        setTimeout(() => setIsPlaying(false), pattern.length * 500)
    }

    const addRhythmBeat = () => {
        if (isPlaying) return

        const newBeat = true
        setUserRhythm(prev => [...prev, newBeat])
        playSound('click')

        if (userRhythm.length + 1 === rhythmPattern.length) {
            // Check if pattern matches
            const matches = userRhythm.every((beat, index) => beat === rhythmPattern[index])
            if (matches && rhythmPattern[userRhythm.length] === newBeat) {
                setRhythmScore(prev => prev + 10)
                playSound('perfect')
            } else {
                playSound('fail')
            }
            setTimeout(() => generateRhythmPattern(), 1000)
        }
    }

    // Shape matcher functions
    const initShapeGame = () => {
        const shapes = ['circle', 'square', 'triangle', 'star', 'heart', 'diamond']
        setTargetShape(shapes[Math.floor(Math.random() * shapes.length)])
        setShapeTimer(30)
    }

    const selectShape = (shape: string) => {
        if (shape === targetShape) {
            setShapeScore(prev => prev + 5)
            playSound('success')
            initShapeGame()
        } else {
            playSound('fail')
        }
    }

    // Sound sequence game
    const generateSoundSequence = () => {
        const sounds = ['👶', '🍼', '🧸', '🎵']
        const sequence = Array.from({ length: 4 }, () => sounds[Math.floor(Math.random() * sounds.length)])
        setSoundSequence(sequence)
        setUserSoundSequence([])

        // Play sequence
        sequence.forEach((sound, index) => {
            setTimeout(() => {
                setPlayingSound(sound)
                playSound('baby')
                setTimeout(() => setPlayingSound(null), 300)
            }, index * 600)
        })
    }

    const addSoundToSequence = (sound: string) => {
        const newSequence = [...userSoundSequence, sound]
        setUserSoundSequence(newSequence)
        playSound('click')

        if (newSequence.length === soundSequence.length) {
            if (JSON.stringify(newSequence) === JSON.stringify(soundSequence)) {
                setSoundScore(prev => prev + 15)
                playSound('perfect')
            } else {
                playSound('fail')
            }
            setTimeout(() => generateSoundSequence(), 1000)
        }
    }

    // Reaction game
    const startReactionGame = () => {
        setReactionActive(false)
        setReactionTime(null)

        const delay = 2000 + Math.random() * 3000
        setTimeout(() => {
            setReactionActive(true)
            setReactionStart(Date.now())
        }, delay)
    }

    const handleReactionClick = () => {
        if (!reactionActive) {
            playSound('fail')
            return
        }

        const time = Date.now() - reactionStart
        setReactionTime(time)
        setReactionActive(false)

        if (!bestReaction || time < bestReaction) {
            setBestReaction(time)
            playSound('perfect')
        } else {
            playSound('success')
        }
    }

    // Color match game
    const initColorGrid = () => {
        const colors = ['#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD', '#F0E68C', '#FFB6C1']
        const grid = Array.from({ length: 6 }, () =>
            Array.from({ length: 6 }, () => colors[Math.floor(Math.random() * colors.length)])
        )
        setColorGrid(grid)
        setTargetColor(colors[Math.floor(Math.random() * colors.length)])
        setColorTimeLeft(45)
    }

    const selectColor = (row: number, col: number) => {
        if (colorGrid[row][col] === targetColor) {
            setColorMatchScore(prev => prev + 3)
            playSound('success')

            // Remove the color
            const newGrid = [...colorGrid]
            newGrid[row][col] = '#FFFFFF'
            setColorGrid(newGrid)

            // Check if we need a new target
            const hasTarget = newGrid.some(row => row.some(cell => cell === targetColor))
            if (!hasTarget) {
                initColorGrid()
            }
        } else {
            playSound('fail')
        }
    }

    // Initialize games
    useEffect(() => {
        initShapeGame()
        generateRhythmPattern()
        generateSoundSequence()
        initColorGrid()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // Track play time
    useEffect(() => {
        const interval = setInterval(() => {
            setTotalPlayTime(prev => prev + 1)

            // Check for achievements
            const totalScore = drawingScore + rhythmScore + shapeScore + soundScore + colorMatchScore
            if (totalScore >= 100 && !showAchievement) {
                setShowAchievement(isTurkish ? '🏆 100 Puan Başarısı!' : '🏆 100 Points Achievement!')
                setTimeout(() => setShowAchievement(null), 3000)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [drawingScore, rhythmScore, shapeScore, soundScore, colorMatchScore, showAchievement, isTurkish])

    // Timer for shape game
    useEffect(() => {
        if (shapeTimer > 0) {
            const timer = setTimeout(() => setShapeTimer(prev => prev - 1), 1000)
            return () => clearTimeout(timer)
        } else {
            initShapeGame()
        }
    }, [shapeTimer])

    // Timer for color game
    useEffect(() => {
        if (colorTimeLeft > 0) {
            const timer = setTimeout(() => setColorTimeLeft(prev => prev - 1), 1000)
            return () => clearTimeout(timer)
        } else {
            initColorGrid()
        }
    }, [colorTimeLeft])

    const totalScore = drawingScore + rhythmScore + shapeScore + soundScore + colorMatchScore

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50">
            <div className="max-w-7xl mx-auto py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href={`/${locale}`}
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        {isTurkish ? 'Ana Sayfaya Dön' : 'Back to Home'}
                    </Link>

                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border-2 border-purple-200">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
                                    <Gamepad2 className="h-8 w-8 text-purple-600" />
                                    {isTurkish ? "Umay'ın Süper Oyun Salonu" : "Umay's Super Game Arcade"}
                                </h1>
                                <p className="text-gray-600 mt-2">
                                    {isTurkish
                                        ? "Gelişmiş motor becerilerimi test et! (Henüz 2 günlükken bile pro gamer'ım 🎮)"
                                        : "Test my advanced motor skills! (Already a pro gamer at 2 days old 🎮)"}
                                </p>
                            </div>

                            <div className="text-right">
                                <div className="text-3xl font-bold text-purple-600">{totalScore}</div>
                                <div className="text-sm text-gray-600">{isTurkish ? 'Toplam Puan' : 'Total Score'}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {isTurkish ? `Oyun Süresi: ${Math.floor(totalPlayTime / 60)}:${(totalPlayTime % 60).toString().padStart(2, '0')}` : `Play Time: ${Math.floor(totalPlayTime / 60)}:${(totalPlayTime % 60).toString().padStart(2, '0')}`}
                                </div>
                            </div>
                        </div>

                        {/* Achievement notification */}
                        {showAchievement && (
                            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-3 text-center animate-bounce">
                                {showAchievement}
                            </div>
                        )}
                    </div>
                </div>

                {/* Games Grid */}
                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                    {/* Drawing Game */}
                    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-pink-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <span className="text-2xl">🎨</span>
                                {isTurkish ? "Parmak Boyama" : "Finger Painting"}
                            </h2>
                            <div className="text-sm">
                                {isTurkish ? `Çizgi: ${drawingScore}` : `Strokes: ${drawingScore}`}
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="flex gap-2 mb-3">
                                {['#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD', '#F0E68C', '#FFB6C1'].map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setCurrentColor(color)}
                                        className={`w-8 h-8 rounded-full border-2 ${currentColor === color ? 'border-gray-800' : 'border-gray-300'}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>

                            <canvas
                                ref={canvasRef}
                                width={400}
                                height={200}
                                className="border-2 border-gray-300 rounded-lg w-full cursor-crosshair bg-white"
                                onMouseDown={startDrawing}
                                onMouseMove={draw}
                                onMouseUp={stopDrawing}
                                onMouseLeave={stopDrawing}
                            />

                            <button
                                onClick={clearCanvas}
                                className="mt-3 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-all text-sm"
                            >
                                {isTurkish ? "Temizle" : "Clear"}
                            </button>
                        </div>

                        <p className="text-xs text-gray-500">
                            {isTurkish ? "🎨 Sanat eserim! Anne bunu buzdolabına asacak!" : "🎨 My masterpiece! Mom will put this on the fridge!"}
                        </p>
                    </div>

                    {/* Rhythm Game */}
                    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <span className="text-2xl">🎵</span>
                                {isTurkish ? "Ritim Ustası" : "Rhythm Master"}
                            </h2>
                            <div className="text-sm">
                                {isTurkish ? `Puan: ${rhythmScore}` : `Score: ${rhythmScore}`}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-center gap-2">
                                {rhythmPattern.map((beat, index) => (
                                    <div
                                        key={index}
                                        className={`w-10 h-10 rounded-lg border-2 ${
                                            playingSound === 'beat' && isPlaying ? 'bg-blue-500' : beat ? 'bg-blue-200' : 'bg-gray-100'
                                        } ${userRhythm[index] ? 'border-green-500' : 'border-gray-300'}`}
                                    />
                                ))}
                            </div>

                            <div className="text-center">
                                {isPlaying ? (
                                    <p className="text-sm text-blue-600">{isTurkish ? "Dinle..." : "Listen..."}</p>
                                ) : (
                                    <button
                                        onClick={addRhythmBeat}
                                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all"
                                    >
                                        {isTurkish ? "🥁 Vur!" : "🥁 Beat!"}
                                    </button>
                                )}
                            </div>

                            <button
                                onClick={generateRhythmPattern}
                                className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all text-sm"
                            >
                                {isTurkish ? "Yeni Ritim" : "New Rhythm"}
                            </button>
                        </div>
                    </div>

                    {/* Shape Matcher */}
                    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <span className="text-2xl">🔷</span>
                                {isTurkish ? "Şekil Eşleştirme" : "Shape Matcher"}
                            </h2>
                            <div className="text-sm">
                                <Timer className="inline h-4 w-4 mr-1" />
                                {shapeTimer}s | {isTurkish ? `Puan: ${shapeScore}` : `Score: ${shapeScore}`}
                            </div>
                        </div>

                        <div className="text-center mb-4">
                            <p className="text-lg mb-2">{isTurkish ? "Bul:" : "Find:"}</p>
                            <div className="text-4xl">
                                {targetShape === 'circle' && '⭕'}
                                {targetShape === 'square' && '⬜'}
                                {targetShape === 'triangle' && '🔺'}
                                {targetShape === 'star' && '⭐'}
                                {targetShape === 'heart' && '❤️'}
                                {targetShape === 'diamond' && '💎'}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {['circle', 'square', 'triangle', 'star', 'heart', 'diamond'].map(shape => (
                                <button
                                    key={shape}
                                    onClick={() => selectShape(shape)}
                                    className="bg-green-100 hover:bg-green-200 rounded-lg p-4 transition-all hover:scale-110"
                                >
                                    <div className="text-3xl">
                                        {shape === 'circle' && '⭕'}
                                        {shape === 'square' && '⬜'}
                                        {shape === 'triangle' && '🔺'}
                                        {shape === 'star' && '⭐'}
                                        {shape === 'heart' && '❤️'}
                                        {shape === 'diamond' && '💎'}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sound Memory */}
                    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <span className="text-2xl">🔊</span>
                                {isTurkish ? "Ses Hafızası" : "Sound Memory"}
                            </h2>
                            <div className="text-sm">
                                {isTurkish ? `Puan: ${soundScore}` : `Score: ${soundScore}`}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-center gap-2">
                                {soundSequence.map((sound, index) => (
                                    <div
                                        key={index}
                                        className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center ${
                                            playingSound === sound ? 'bg-purple-500 scale-110' : 'bg-purple-100'
                                        } ${userSoundSequence[index] ? 'border-green-500' : 'border-purple-300'}`}
                                    >
                                        {playingSound === sound ? sound : '?'}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-4 gap-2">
                                {['👶', '🍼', '🧸', '🎵'].map(sound => (
                                    <button
                                        key={sound}
                                        onClick={() => addSoundToSequence(sound)}
                                        className="bg-purple-100 hover:bg-purple-200 rounded-lg p-3 text-2xl transition-all hover:scale-110"
                                    >
                                        {sound}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={generateSoundSequence}
                                className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all text-sm"
                            >
                                {isTurkish ? "Yeni Sıra" : "New Sequence"}
                            </button>
                        </div>
                    </div>

                    {/* Reaction Time */}
                    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Zap className="h-6 w-6 text-red-500" />
                                {isTurkish ? "Refleks Testi" : "Reaction Test"}
                            </h2>
                            {bestReaction && (
                                <div className="text-sm">
                                    <Trophy className="inline h-4 w-4 text-yellow-500 mr-1" />
                                    {bestReaction}ms
                                </div>
                            )}
                        </div>

                        <div className="h-40 flex items-center justify-center">
                            {!reactionActive && !reactionTime && (
                                <button
                                    onClick={startReactionGame}
                                    className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all"
                                >
                                    {isTurkish ? "Başla" : "Start"}
                                </button>
                            )}

                            {!reactionActive && reactionTime && (
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-red-600">{reactionTime}ms</div>
                                    <button
                                        onClick={startReactionGame}
                                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all text-sm"
                                    >
                                        {isTurkish ? "Tekrar Dene" : "Try Again"}
                                    </button>
                                </div>
                            )}

                            {reactionActive && (
                                <button
                                    onClick={handleReactionClick}
                                    className="w-full h-full bg-green-500 rounded-lg text-white text-2xl font-bold animate-pulse hover:bg-green-600 transition-all"
                                >
                                    {isTurkish ? "TIKLA!" : "CLICK!"}
                                </button>
                            )}
                        </div>

                        <p className="text-xs text-gray-500 text-center mt-2">
                            {isTurkish ? "Yeşil olduğunda hemen tıkla!" : "Click as soon as it turns green!"}
                        </p>
                    </div>

                    {/* Color Match */}
                    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-yellow-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <span className="text-2xl">🎨</span>
                                {isTurkish ? "Renk Avı" : "Color Hunt"}
                            </h2>
                            <div className="text-sm">
                                <Timer className="inline h-4 w-4 mr-1" />
                                {colorTimeLeft}s | {isTurkish ? `Puan: ${colorMatchScore}` : `Score: ${colorMatchScore}`}
                            </div>
                        </div>

                        <div className="text-center mb-3">
                            <p className="text-sm mb-1">{isTurkish ? "Bu rengi bul:" : "Find this color:"}</p>
                            <div
                                className="w-16 h-16 mx-auto rounded-lg border-2 border-gray-400"
                                style={{ backgroundColor: targetColor }}
                            />
                        </div>

                        <div className="grid grid-cols-6 gap-1">
                            {colorGrid.map((row, rowIndex) => (
                                row.map((color, colIndex) => (
                                    <button
                                        key={`${rowIndex}-${colIndex}`}
                                        onClick={() => selectColor(rowIndex, colIndex)}
                                        className="aspect-square rounded border border-gray-200 hover:scale-110 transition-all"
                                        style={{ backgroundColor: color }}
                                    />
                                ))
                            ))}
                        </div>
                    </div>
                </div>

                {/* Score Summary */}
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 border-2 border-yellow-300">
                    <h3 className="text-xl font-bold mb-4 text-center">
                        {isTurkish ? "🏆 Skor Tablosu" : "🏆 Scoreboard"}
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-lg p-3 text-center">
                            <div className="text-2xl mb-1">🎨</div>
                            <div className="text-xl font-bold text-pink-600">{drawingScore}</div>
                            <div className="text-xs text-gray-600">{isTurkish ? "Çizim" : "Drawing"}</div>
                        </div>

                        <div className="bg-white rounded-lg p-3 text-center">
                            <div className="text-2xl mb-1">🎵</div>
                            <div className="text-xl font-bold text-blue-600">{rhythmScore}</div>
                            <div className="text-xs text-gray-600">{isTurkish ? "Ritim" : "Rhythm"}</div>
                        </div>

                        <div className="bg-white rounded-lg p-3 text-center">
                            <div className="text-2xl mb-1">🔷</div>
                            <div className="text-xl font-bold text-green-600">{shapeScore}</div>
                            <div className="text-xs text-gray-600">{isTurkish ? "Şekiller" : "Shapes"}</div>
                        </div>

                        <div className="bg-white rounded-lg p-3 text-center">
                            <div className="text-2xl mb-1">🔊</div>
                            <div className="text-xl font-bold text-purple-600">{soundScore}</div>
                            <div className="text-xs text-gray-600">{isTurkish ? "Sesler" : "Sounds"}</div>
                        </div>
                    </div>

                    <div className="text-center mt-6">
                        <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                            {totalScore} {isTurkish ? "PUAN" : "POINTS"}
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                            {totalScore < 50
                                ? (isTurkish ? "Henüz öğreniyorum! 👶" : "Still learning! 👶")
                                : totalScore < 100
                                    ? (isTurkish ? "İyi gidiyorum! 🌟" : "Getting better! 🌟")
                                    : totalScore < 200
                                        ? (isTurkish ? "Süper bebek! 🚀" : "Super baby! 🚀")
                                        : (isTurkish ? "Oyun ustası bebek! 🏆" : "Master gamer baby! 🏆")}
                        </p>

                        <Link
                            href={`/${locale}/donate/umay`}
                            className="inline-block mt-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all"
                        >
                            {isTurkish ? "Bu kadar oyun yeter, hediye zamanı! 🎁" : "Enough gaming, gift time! 🎁"}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}