'use client'

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";

import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'
import { useLoader } from '@/app/lib/providers/LoaderContext';

interface IProps {
	children?: React.ReactNode
	href: string
	onClick?: () => void
	delayBeforeLeave: number
	delayToStart: number
	additionalClassName?: string
	prefetch?: boolean
}

export default function LinkWithDelay({ children, href, onClick, delayBeforeLeave, delayToStart, additionalClassName, prefetch }: IProps) {
	const { setTransitionState } = usePageTransitions()
	const router = useRouter()
	const pathname = usePathname()
	const { isLoading } = useLoader()

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		if(pathname === href) return
		
		onClick && onClick()
		setTransitionState('start')
		setTimeout(() => {
			setTransitionState('beforeLeave')
		}, delayToStart)
		e.preventDefault()
		
		setTimeout(() => {
			router.push(href)
		}, delayBeforeLeave)
	}

	useEffect(() => {
		if(pathname && !isLoading) {
			setTransitionState('finishLeave')
		}
	}, [pathname, setTransitionState, isLoading])

	return (
		<Link
			className={additionalClassName}
			href={href}
			onClick={handleClick}
			prefetch={prefetch ? prefetch : false}
		>
			{children}
		</Link>
	)
}