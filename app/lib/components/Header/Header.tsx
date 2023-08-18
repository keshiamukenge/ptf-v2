'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import gsap from '@/app/lib/utils/gsap'

import './style.scss'
import LinkWithDelay from '@/app/lib/components/Links/LinkWithDelay'
import LinkIsActive from '@/app/lib/components/Links/LinkIsActive'
import { useLoader } from '@/app/lib/providers/LoaderContext'
import { useResponsive } from '@/app/lib/hooks/useResponsive'
import { DEFAULT_DELAY_BEFORE_LEAVE, DEFAULT_DELAY_TO_START } from '@/app/lib/constants'

export default function Header() {
	const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState<boolean>(false)
	const { isLoading } = useLoader()
	const device = useResponsive()
	const pathname = usePathname()
	const headerRef = useRef(null)
	const mobileMenuContentRef = useRef(null)

	const onClickOnActiveLink = useCallback((isActive: boolean) => {
		if(!isActive) return

		setMobileMenuIsOpen(false)
	}, [])

	useEffect(() => {
		if(isLoading) return

		gsap.to(headerRef.current, {
			opacity: 1,
			y: 0,
			duration: 1,
		})
	}, [isLoading])

	useEffect(() => {
		if(mobileMenuIsOpen) {
			gsap.set(mobileMenuContentRef.current, {
				display: 'block',
			})
			gsap.to(mobileMenuContentRef.current, {
				opacity: 1,
				duration: 0.5,
			})
		} else {
			gsap.to(mobileMenuContentRef.current, {
				opacity: 0,
				duration: 0.5,
				delay: 0.1,
				onComplete: () => {
					gsap.set(mobileMenuContentRef.current, {
						display: 'none',
					})
				}
			})
		}
	}, [mobileMenuIsOpen])

	useEffect(() => {
		if(device !== 'mobile') return

		setMobileMenuIsOpen(false)
	}, [pathname, device])

	if(isLoading) return null

	return(
		<header ref={headerRef}>
			{device !== 'mobile' ? (
				<div className="desktop-menu">
					<LinkWithDelay additionalClassName="home-link" href="/" delayBeforeLeave={DEFAULT_DELAY_BEFORE_LEAVE} delayToStart={DEFAULT_DELAY_TO_START}>Keshia Mukenge</LinkWithDelay>
					<span className="job">Web Developer | Front-end</span>
					<LinkIsActive additionalClassName="selected-works-link" path="/">
						<LinkWithDelay href="/" delayBeforeLeave={DEFAULT_DELAY_BEFORE_LEAVE} delayToStart={DEFAULT_DELAY_TO_START}>
							Selected Works
						</LinkWithDelay>
					</LinkIsActive>
					<LinkIsActive additionalClassName="archives-link" path="/archives">
						<LinkWithDelay href="/archives" delayBeforeLeave={DEFAULT_DELAY_BEFORE_LEAVE} delayToStart={DEFAULT_DELAY_TO_START}>
							Archives
						</LinkWithDelay>
					</LinkIsActive>
					<LinkIsActive additionalClassName="about-link" path="/about">
						<LinkWithDelay href="/about" delayBeforeLeave={DEFAULT_DELAY_BEFORE_LEAVE} delayToStart={DEFAULT_DELAY_TO_START}>
							About
						</LinkWithDelay>
					</LinkIsActive>
				</div>
			) : (
				<div className="mobile-menu">
					<div className="head">
						<LinkWithDelay additionalClassName="home-link" href="/" delayBeforeLeave={DEFAULT_DELAY_BEFORE_LEAVE} delayToStart={DEFAULT_DELAY_TO_START}>KM</LinkWithDelay>
						<span className="job">Web Developer  <br /> Front-end</span>
						<span className="open-menu-button" onClick={() => setMobileMenuIsOpen(true)}>Menu</span>
					</div>
					<div ref={mobileMenuContentRef} className="content">
						<div className="container-content">
							<div className="content-head">
								<span className="home-link">KM</span>
								<span className="job">Web Developer  <br /> Front-end</span>
								<span className="close-menu-button" onClick={() => setMobileMenuIsOpen(false)}>Close</span>
							</div>
							<div className="containers-links">
								<LinkIsActive additionalClassName="selected-works-link" path="/" onClick={onClickOnActiveLink}>
									<LinkWithDelay href="/" delayBeforeLeave={DEFAULT_DELAY_BEFORE_LEAVE} delayToStart={DEFAULT_DELAY_TO_START}>
										Selected Works
									</LinkWithDelay>
								</LinkIsActive>
								<LinkIsActive additionalClassName="archives-link" path="/archives" onClick={onClickOnActiveLink}>
									<LinkWithDelay href="/archives" delayBeforeLeave={DEFAULT_DELAY_BEFORE_LEAVE} delayToStart={DEFAULT_DELAY_TO_START}>
										Archives
									</LinkWithDelay>
								</LinkIsActive>
								<LinkIsActive additionalClassName="about-link" path="/about" onClick={onClickOnActiveLink}>
									<LinkWithDelay href="/about" delayBeforeLeave={DEFAULT_DELAY_BEFORE_LEAVE} delayToStart={DEFAULT_DELAY_TO_START}>
										About
									</LinkWithDelay>
								</LinkIsActive>
							</div>
						</div>
					</div>
				</div>
			)}
		</header>
	)
}