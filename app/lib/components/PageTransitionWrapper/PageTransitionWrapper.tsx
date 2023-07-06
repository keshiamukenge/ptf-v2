'use client'

import { useEffect } from 'react'
import gsap from 'gsap'

interface IProps {
	children: React.ReactNode
}

export default function PageTransitionWrapper({ children }: IProps) {
	return(
		<div>
			{children}
		</div>
	)
}