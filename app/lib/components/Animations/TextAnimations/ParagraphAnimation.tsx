'use client'

import { useEffect, useState, useRef } from 'react'
import gsap from '@/app/lib/utils/gsap'
import SplitInLines from 'lines-split'

import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'
import { useLoader } from '@/app/lib/providers/LoaderContext'
import BasicText from './BasicText'

interface IProps {
	text: string
}

export default function ParagraphAnimation({ text }: IProps) {
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const { transitionState } = usePageTransitions()
	const { isLoading } = useLoader()
	const textRef = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		if(!textRef.current) return

		new SplitInLines(textRef.current)
		gsap.set(textRef.current, {
			opacity: 1,
		})
	}, [])

	useEffect(() => {
		const lines = textRef.current?.querySelectorAll('span span')

		if(!textRef.current || !lines) return

		if(!transitionState && !isLoading) {
			gsap.to(lines, {
				delay: 0.3,
				y: 0,
				duration: 0.5,
				stagger: 0.05,
				onComplete: () => {
					setIsVisible(true)
				}
			})
		}

		if(transitionState === 'finishLeave') {
			gsap.to(lines, {
				delay: 1.2,
				y: 0,
				duration: 0.5,
				stagger: 0.05,
				onComplete: () => {
					setIsVisible(true)
				}
			})
		}
	}, [transitionState, isLoading])

	return <BasicText ref={textRef} text={text} isVisible={isVisible} />
}