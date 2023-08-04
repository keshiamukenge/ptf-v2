'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import SplitInLines from 'lines-split'

import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'
import BasicText from './BasicText'

interface IProps {
	target: string
	text: string
}

export default function ParagraphAnimation({ target, text }: IProps) {
	const { transitionState } = usePageTransitions()

	useEffect(() => {
		new SplitInLines(`.paragraph-animation.${target}`)
		gsap.set('.paragraph-animation', {
			opacity: 1,
		})
	}, [target])

	useEffect(() => {
		if(!transitionState) {
			gsap.to('.paragraph-animation span span', {
				delay: 0.3,
				y: 0,
				duration: 0.5,
				stagger: 0.05,
			})
		}

		if(transitionState === 'finishLeave') {
			gsap.to('.paragraph-animation span span', {
				delay: 0.5,
				y: 0,
				duration: 0.5,
				stagger: 0.05,
			})
		}

		// if(transitionState === 'start') {
		// 	gsap.to('.paragraph-animation span span', {
		// 		delay: 0.1,
		// 		duration: 0.1,
		// 		opacity: 0,
		// 	})
		// }
	}, [transitionState])

	return <BasicText text={text} target={target} />
}