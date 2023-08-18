'use client'

import { useRef, useEffect }	from 'react'
import gsap from '@/app/lib/utils/gsap'

import './style.scss'
import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'
import { START_PAGE_ANIMATION_DELAY } from '@/app/lib/constants';

interface IProps {
	text: string
}

export default function TitleAnimation({ text }: IProps) {
	const titleRef = useRef(null)
	const { transitionState } = usePageTransitions()

	useEffect(() => {
		if(!transitionState) {
			setTimeout(() => {
				gsap.to(titleRef.current, {
					duration: 0.4,
					y: 0,
				})
			}, START_PAGE_ANIMATION_DELAY)
		}

		if(transitionState === 'finishLeave') {
			gsap.to(titleRef.current, {
				delay: 0.5,
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