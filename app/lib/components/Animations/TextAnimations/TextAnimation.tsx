'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

import './style.scss'
import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'

interface IProps {
	text: string | React.ReactNode
	delay?: number
}

export default function TextAnimation({ text }: IProps) {
	const { transitionState } = usePageTransitions()
	const textRef = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		if(!transitionState) {	
			gsap.to(textRef.current, {
				delay: 0.3,
				y: 0,
				duration: 0.5,
			})
		}
		
		if(transitionState === 'start') {
			gsap.to(textRef.current, {
				duration: 0.3,
				opacity: 0,
			})
		}

		if(transitionState === 'finishLeave') {
			gsap.to(textRef.current, {
				delay: 1,
				y: 0,
				duration: 0.5,
			})
		}
	}, [transitionState])

	return(
		<span className="container-text-animation">
			<span ref={textRef} className="text-animation">{text}</span>
		</span>
	)
}