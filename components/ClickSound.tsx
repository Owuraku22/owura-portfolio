"use client"

import { useEffect, useRef } from "react"

const ClickSound = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        // Create audio instance with preload
        const audio = new Audio("/audio/click sound.mp3")
        audio.preload = "auto"
        audioRef.current = audio

        const handleInteraction = (e: MouseEvent) => {
            // Check if the clicked element or its parents is interactive
            const target = e.target as HTMLElement
            const interactiveElement = target.closest(
                'button, a, [role="button"], input[type="submit"], input[type="button"]'
            )

            if (interactiveElement && audioRef.current) {
                // Reset time to 0 to allow rapid clicking
                audioRef.current.currentTime = 0
                // Use a promise to handle play() to avoid unhandled promise rejections
                const playPromise = audioRef.current.play()
                if (playPromise !== undefined) {
                    playPromise.catch((err) => {
                        // Ignore auto-play errors (usually due to lack of user interaction first)
                        // or if the audio was interrupted by a new load
                    })
                }
            }
        }

        // Use mousedown for instant feedback (fires before click)
        // Use passive listener for better performance (doesn't block scrolling)
        document.addEventListener("mousedown", handleInteraction, { passive: true })

        return () => {
            document.removeEventListener("mousedown", handleInteraction)
        }
    }, [])

    return null
}

export default ClickSound
