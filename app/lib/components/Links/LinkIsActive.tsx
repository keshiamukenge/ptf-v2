'use client'

import { useRef, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import gsap from '@/app/lib/utils/gsap'

import './style.scss'
import { useResponsive } from '@/app/lib/hooks/useResponsive'

interface IProps {
	children: React.ReactNode
	additionalClassName?: string
	path: string
	onClick?: (isActive: boolean) => void
}

export default function LinkIsActive({ children, additionalClassName, path, onClick }: IProps) {
	const underlineRef = useRef<HTMLDivElement>(null)
	const containerLinkRef = useRef<HTMLDivElement>(null)
	const pathname = usePathname()
	const device = useResponsive()

	const handleMouseEnter = useCallback(() => {
		if(device === 'mobile' || device === 'tablet') return

		gsap.to(underlineRef.current, {
			duration: 0.3,
			x: 0
		})
	}, [device])

	const handleMouseLeave = useCallback(() => {
		if(device === 'mobile' || device === 'tablet') return

		gsap.to(underlineRef.current, {
			duration: 0.3,
			x: '100%',
			onComplete: () => {
				gsap.set(underlineRef.current, {
					x: '-100%'
				})
			}
		})
	}, [device])

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
			onClick={() => onClick && onClick(path === pathname)}
		>
			{children}
			<span ref={underlineRef}></span>
		</div>
	)
}