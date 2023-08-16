'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from '@/app/lib/utils/gsap'

import './style.scss'

interface IProps {
	label: string
	href: string
}

export default function ExternalLink({ label, href }: IProps) {
	const firstArrowIconRef = useRef<HTMLImageElement>(null)
	const secondArrowIconRef = useRef<HTMLImageElement>(null)

	function onEnter() {
		if(!firstArrowIconRef.current || !secondArrowIconRef.current) return
		
		gsap.to(firstArrowIconRef.current, {
			x: '+=100%', 
			y: '-=100%',
			duration: 0.2,
			onComplete: () => {
				gsap.set(firstArrowIconRef.current, {
					x: 0,
					y: 0
				})
			}
		})
		gsap.to(secondArrowIconRef.current, {
			x: '+=100%', 
			y: '-=100%',
			duration: 0.2,
			onComplete: () => {
				gsap.set(secondArrowIconRef.current, {
					x: "-100%",
					y: 0
				})
			}
		})
	}

	return(
		<div className="ExternalLink" onMouseEnter={onEnter}>
			<a href={href} target='_blank'></a>
			<span className="link-label">{label}</span>
			<span className="container-icon">
				<Image ref={firstArrowIconRef} className="first-arrow" src="/svg/arrow.svg" alt="arrow icon" width={30} height={30} />
				<Image ref={secondArrowIconRef} className="second-arrow" src="/svg/arrow.svg" alt="arrow icon" width={30} height={30} />
			</span>
		</div>
	)
}