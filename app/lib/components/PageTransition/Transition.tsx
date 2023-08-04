'use client'

import { useRef, useEffect } from 'react'
import gsap, { Expo } from "gsap"

import './style.scss'
import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'

export default function Transition() {
	const transitionRef = useRef<HTMLSpanElement>(null)
	const darkBackground = useRef<HTMLSpanElement>(null)
	const { transitionState } = usePageTransitions()

	useEffect(() => {
		if (transitionState === 'beforeLeave') {
			gsap.set(darkBackground.current, {
				display: 'block'
			})

			gsap.to(transitionRef.current, {
				duration: 0.7,
				top: -2,
				ease: Expo.easeOut,
			})

			gsap.to(darkBackground.current, {
				duration: 0.1,
				opacity: 0.5,
			})
		}

		if (transitionState === 'finishLeave') {
			gsap.set(darkBackground.current, {
				delay: 0.2,
				display: 'none',
				opacity: 0
			})
			gsap.to(transitionRef.current, {
				duration: 0.7,
				bottom: '100%',
				ease: Expo.easeIn,
				onComplete: () => {
					gsap.set(transitionRef.current, {
						bottom: 0,
						top: "100%"
					})
				}
			})
		}
	}, [transitionState])

	return (
		<>
			<span className="container-transition" ref={transitionRef}></span>
			<span ref={darkBackground} className="dark-background"></span>
		</>
	)
}