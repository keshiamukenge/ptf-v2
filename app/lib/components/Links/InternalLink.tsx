'use client'

import { useRef, useCallback } from 'react'
import Image from "next/image"
import gsap from '@/app/lib/utils/gsap'

import './style.scss'
import LinkWithDelay from '@/app/lib/components/Links/LinkWithDelay'

interface IProps {
	label: string
	href: string
}

export default function InternalLink({ label, href }: IProps) {
	const arrowIconRef = useRef<HTMLImageElement | null>(null)
	const linkRef = useRef<HTMLAnchorElement | null>(null)

	const onMouseEnter = useCallback(() => {
		if(!arrowIconRef.current || !linkRef.current) return

		gsap.to(arrowIconRef.current, {
			x: -5,
			duration: 0.5,
		})

		gsap.to(linkRef.current, {
			x: 5,
			duration: 0.5,
		})
	}, [])

	const onMouseLeave = useCallback(() => {
		if(!arrowIconRef.current || !linkRef.current) return

		gsap.to(arrowIconRef.current, {
			x: 0,
			duration: 0.5,
		})

		gsap.to(linkRef.current, {
			x: 0,
			duration: 0.5,
		})
	}, [])

	return(
		<div className="InternalLink" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			<Image ref={arrowIconRef} src="/svg/arrow.svg" alt="arrow icon" width={20} height={20} />
			<LinkWithDelay href={href} delayBeforeLeave={400} delayToStart={0}>
				<span ref={linkRef} >
					{label}
				</span>
			</LinkWithDelay>
		</div>
	)
}