'use client'

import { useRef, useEffect } from 'react'
import gsap, { Expo } from "gsap"

import './style.scss'
import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'

export default function Transition() {
	const transitionRef = useRef<HTMLSpanElement>(null)
	const { transitionState } = usePageTransitions()

	useEffect(() => {
		if (transitionState === 'beforeLeave') {
			gsap.to(transitionRef.current, {
				duration: 1,
				bottom: -2,
				ease: Expo.easeOut,
			})
		}

		if (transitionState === 'finishLeave') {
			gsap.to(transitionRef.current, {
				duration: 1,
				bottom: '100%',
				ease: Expo.easeIn,
			})
		}
	}, [transitionState])

	return (
		<span className="container-transition" ref={transitionRef}></span>
	)
}