'use client'

import { useEffect, useState, useRef } from 'react'
import gsap from '@/app/lib/utils/gsap'
import SplitInLines from 'lines-split'

import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'
import BasicText from './BasicText'
import { START_PAGE_ANIMATION_DELAY } from '@/app/lib/constants';

interface IProps {
	text: string
}

export default function ParagraphAnimation({ text }: IProps) {
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const { transitionState } = usePageTransitions()
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

		if(!transitionState) {
			setTimeout(() => {

				gsap.to(lines, {
					delay: 0.3,
					y: 0,
					duration: 0.5,
					stagger: 0.05,
					onComplete: () => {
						setIsVisible(true)
					}
				})
			}, START_PAGE_ANIMATION_DELAY)
		}

		if(transitionState === 'finishLeave') {
			gsap.to(lines, {
				delay: 0.5,
				y: 0,
				duration: 0.5,
				stagger: 0.05,
				onComplete: () => {
					setIsVisible(true)
				}
			})
		}
	}, [transitionState])

	return <BasicText ref={textRef} text={text} isVisible={isVisible} />
}