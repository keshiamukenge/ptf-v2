'use client'

import React, { useEffect, useRef } from 'react'
import gsap from '@/app/lib/utils/gsap'

import './style.scss'
import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'
import { useLoader } from '@/app/lib/providers/LoaderContext'

interface IProps {
	text: string | React.ReactNode
}

export default function TextAnimation({ text }: IProps) {
	const { transitionState } = usePageTransitions()
	const textRef = useRef<HTMLSpanElement>(null)
	const { isLoading } = useLoader()

	useEffect(() => {
		if(!transitionState && !isLoading) {	
			gsap.to(textRef.current, {
				delay: 0.3,
				y: 0,
				duration: 0.6,
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
				delay: 1.2,
				y: 0,
				duration: 0.6,
			})
		}
	}, [transitionState, isLoading])

	return(
		<span className="container-text-animation">
			<span ref={textRef} className="text-animation">{text}</span>
		</span>
	)
}