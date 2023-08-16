'use client'

import { useEffect, useRef } from 'react'
import gsap from '@/app/lib/utils/gsap'
import Lenis from '@studio-freight/lenis'

import './style.scss'

interface IProps {
	scrollInstance: Lenis | undefined
}

export default function ScrollBar({ scrollInstance }: IProps) {
	const progressRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if(!progressRef.current || !scrollInstance) return

		scrollInstance.on('scroll', (instance: Lenis) => {
			gsap.to(progressRef.current, {
				height: `${instance.progress * 100}%`,
			})
		})
	}, [scrollInstance])

	return (
		<div className='ScrollBar'>
			<div ref={progressRef} className='progress' />
		</div>
	)
}