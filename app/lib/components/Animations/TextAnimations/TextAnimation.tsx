'use client'

import React, { useEffect, useRef } from 'react'
import gsap from '@/app/lib/utils/gsap'

import './style.scss'
import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'
import { useLoader } from '@/app/lib/providers/LoaderContext'

interface IProps {
	text: string | React.ReactNode
	delay?: number
}

export default function TextAnimation({ text, delay }: IProps) {
	const { transitionState } = usePageTransitions()
	const textRef = useRef<HTMLSpanElement>(null)
	const { isLoading } = useLoader()

	useEffect(() => {
		if(!textRef.current) return
		
		if(!transitionState && !isLoading) {
			gsap.to(textRef.current, {
				delay: delay ? delay + 0.3 : 0.3,
				y: 0,
				duration: 0.6,
			})

			return
		}

		if(transitionState === 'finishLeave') {
			gsap.to(textRef.current, {
				delay: delay ? delay + 1.2 : 1.2,
				y: 0,
				duration: 0.6,
			})
		}
	}, [transitionState, isLoading, delay])

	return(
		<span className="container-text-animation">
			<span ref={textRef} className="text-animation">{text}</span>
		</span>
	)
}