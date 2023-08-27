'use client'

import { useRef, useEffect }	from 'react'
import { Expo } from 'gsap'

import './style.scss'
import gsap from '@/app/lib/utils/gsap'
import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'
import { useLoader } from '@/app/lib/providers/LoaderContext'

interface IProps {
	text: string
}

export default function TitleAnimation({ text }: IProps) {
	const titleRef = useRef(null)
	const { transitionState } = usePageTransitions()
	const { isLoading } = useLoader()

	useEffect(() => {
		if(!titleRef.current) return
		
		if(!transitionState && !isLoading) {
			gsap.to(titleRef.current, {
				duration: 1.5,
				ease: Expo.easeOut,
				y: 0,
			})

			return
		}

		if(transitionState === 'finishLeave') {
			gsap.to(titleRef.current, {
				delay: 0.9,
				duration: 1.5,
				ease: Expo.easeOut,
				y: 0,
			})
		}
	}, [transitionState, isLoading])

	return(
		<span className="container-title-animation">
			<span ref={titleRef} className="title-animation">{text}</span>
		</span>
	)
}