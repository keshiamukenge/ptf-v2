'use client'

import React, { useEffect, useRef } from 'react'
import gsap from '@/app/lib/utils/gsap'

import './style.scss'
import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'
import { START_PAGE_ANIMATION_DELAY } from '@/app/lib/constants';

interface IProps {
	text: string | React.ReactNode
}

export default function TextAnimation({ text }: IProps) {
	const { transitionState } = usePageTransitions()
	const textRef = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		if(!transitionState) {	
			setTimeout(() => {
			gsap.to(textRef.current, {
				delay: 0.3,
				y: 0,
				duration: 0.5,
			})
			}, START_PAGE_ANIMATION_DELAY)
		}
		
		if(transitionState === 'start') {
			gsap.to(textRef.current, {
				duration: 0.3,
				opacity: 0,
			})
		}

		if(transitionState === 'finishLeave') {
			gsap.to(textRef.current, {
				delay: 0.5,
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