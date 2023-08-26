'use client'

import { useRef, useEffect } from 'react'
import gsap, { Expo, Power1 } from "gsap"

import './style.scss'
import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'

export default function Transition() {
	const transitionRef = useRef<HTMLSpanElement>(null)
	const darkBackground = useRef<HTMLSpanElement>(null)
	const loadingTextRef = useRef<HTMLSpanElement>(null)
	const { transitionState } = usePageTransitions()

	useEffect(() => {
		if (transitionState === 'beforeLeave') {
			gsap.set(darkBackground.current, {
				display: 'block'
			})

			gsap.to(transitionRef.current, {
				duration: 1,
				top: -2,
				ease: Expo.easeOut,
			})

			gsap.to(loadingTextRef.current, {
				y: 0,
				duration: 0.8,
			})

			gsap.to(darkBackground.current, {
				duration: 0.1,
				opacity: 0.5,
			})
		}

		if (transitionState === 'finishLeave') {
			gsap.set(darkBackground.current, {
				delay: 0.3,
				display: 'none',
				opacity: 0
			})
			
			gsap.to(transitionRef.current, {
				delay: 0.2,
				duration: 1,
				bottom: '100%',
				ease: Expo.easeIn,
				onComplete: () => {
					gsap.set(transitionRef.current, {
						bottom: 0,
						top: "100%"
					})
				}
			})

			gsap.to(loadingTextRef.current, {
				y: '-100%',
				duration: 0.8,
				ease: Power1.easeOut,
				onComplete: () => {
					gsap.set(loadingTextRef.current, {
						y: '100%'
					})
				}
			})
		}
	}, [transitionState])

	return (
		<>
			<span className="container-transition" ref={transitionRef}>
				<span className="container-loading-text">
					<span ref={loadingTextRef}>LOADING</span>
				</span>
			</span>
			<span ref={darkBackground} className="dark-background"></span>
		</>
	)
}