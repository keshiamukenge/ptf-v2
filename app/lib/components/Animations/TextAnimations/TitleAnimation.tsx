'use client'

import { useRef, useEffect }	from 'react'
import gsap from 'gsap'

import './style.scss'
import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'

interface IProps {
	text: string
}

export default function TitleAnimation({ text }: IProps) {
	const titleRef = useRef(null)
	const { transitionState } = usePageTransitions()

	useEffect(() => {
		if(!transitionState) {
			gsap.to(titleRef.current, {
				duration: 0.4,
				y: 0,
			})
		}

		if(transitionState === 'start') {
			gsap.to(titleRef.current, {
				duration: 0.3,
				opacity: 0,
			})
		}

		if(transitionState === 'finishLeave') {
			gsap.to(titleRef.current, {
				delay: 1,
				duration: 0.4,
				y: 0,
			})
		}
	}, [transitionState])

	return(
		<span className="container-title-animation">
			<span ref={titleRef} className="title-animation">{text}</span>
		</span>
	)
}