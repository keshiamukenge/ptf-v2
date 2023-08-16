'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

import './style.scss'
import InternalLink from '@/app/lib/components/Links/InternalLink'
import Header from '@/app/lib/components/Header/Header'
import Footer from '@/app/lib/components/Footer/Footer'
import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'

export default function NotFound() {
	const notFoundPageRef = useRef<HTMLElement>(null)
	const { transitionState } = usePageTransitions()

	useEffect(() => {
		if(transitionState === 'start') {
			gsap.to(notFoundPageRef.current, {
				duration: 0.5,
				y: -100,
			})
		}
	}, [transitionState])

	return(
		<>
			<Header />
			<main ref={notFoundPageRef} className="not-found-page">
				<div className="container-error-msg">
					<h2>Error 404</h2>
					<h1>Page not found </h1>
				</div>
				<div className="container-internal-link">
					<InternalLink label="Go back to home" href="/" />
				</div>
				<Footer fixedPosition />
			</main>
		</>
	)
}