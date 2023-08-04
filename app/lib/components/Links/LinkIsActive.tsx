'use client'

import { useRef, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

import './style.scss'

interface IProps {
	children: React.ReactNode
	additionalClassName?: string
	path: string
}

export default function LinkIsActive({ children, additionalClassName, path }: IProps) {
	const underlineRef = useRef<HTMLDivElement>(null)
	const containerLinkRef = useRef<HTMLDivElement>(null)
	const pathname = usePathname()

	const handleMouseEnter = useCallback(() => {
		gsap.to(underlineRef.current, {
			duration: 0.3,
			x: 0
		})
	}, [])

	const handleMouseLeave = useCallback(() => {
		gsap.to(underlineRef.current, {
			duration: 0.3,
			x: '100%',
			onComplete: () => {
				gsap.set(underlineRef.current, {
					x: '-100%'
				})
			}
		})
	}, [])

	useEffect(() => {
		if(!containerLinkRef.current) return

		if(pathname === path) {
			containerLinkRef.current.classList.add('active')
		} else {
			containerLinkRef.current.classList.remove('active')
		}
	}, [pathname, path])

	return(
		<div
			ref={containerLinkRef}
			className={`container-link ${additionalClassName}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{children}
			<span ref={underlineRef}></span>
		</div>
	)
}