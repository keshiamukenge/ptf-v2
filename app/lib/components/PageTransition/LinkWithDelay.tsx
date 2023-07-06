'use client'

import Link from "next/link";
import { useRouter } from 'next/navigation';

import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'

interface IProps {
	children?: React.ReactNode
	href: string
	onClick?: () => void
}

export default function LinkWithDelay({ children, href, onClick }: IProps) {
	const { setTransitionState } = usePageTransitions()
	const router = useRouter()

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		onClick && onClick()
		setTransitionState('beforeLeave')
		e.preventDefault()
		
		setTimeout(() => {
			router.push(href)
			setTransitionState('fishishLeave')
		}, 2000)
	}

	return <Link href={href} onClick={handleClick}>{children}</Link>
}