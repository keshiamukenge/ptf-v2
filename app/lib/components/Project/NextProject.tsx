'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from '@/app/lib/utils/gsap'

import './style.scss'
import { useProjects } from '@/app/lib/providers/ProjectsContext'
import LinkWithDelay from '@/app/lib/components/Links/LinkWithDelay'
import { useResponsive } from '@/app/lib/hooks/useResponsive'
import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'
import { DEFAULT_DELAY_BEFORE_LEAVE } from '@/app/lib/constants'

export default function NextProject() {
	const lineRef = useRef<HTMLHeadingElement>(null)
	const arrowIconRef = useRef<HTMLImageElement>(null)
	const nextProjectContainer = useRef<HTMLDivElement>(null)
	const { setSelectedProjectId, projects, nextProjectId } = useProjects()
	const { transitionState } = usePageTransitions()
	const device = useResponsive()

	function onEnter() {
		if(!lineRef.current || !arrowIconRef.current) return

		if(device === 'desktop') {
			gsap.to(lineRef.current, {
				duration: 0.3,
				x: 0
			})
			
			gsap.to(arrowIconRef.current, {
				duration: 0.3,
				x: 30
			})
		}
	}

	function onLeave() {
		if(!lineRef.current || !arrowIconRef.current) return
		
		if(device === 'desktop') {
			gsap.to(lineRef.current, {
				duration: 0.3,
				x: '100%',
				onComplete: () => {
					gsap.set(lineRef.current, {
						x: '-100%'
					})
				}
			})
			
			gsap.to(arrowIconRef.current, {
				duration: 0.5,
				x: 0
			})
		}
	}

	useEffect(() => {
		if(!nextProjectContainer.current) return
		
		if(transitionState === 'start') {
			gsap.to(nextProjectContainer.current, {
				duration: 0.5,
				y: '-=100',
			})
		}
	}, [transitionState])

	if(typeof nextProjectId !== 'number') {
		return null
	}

	return(
		<div ref={nextProjectContainer}>
			<LinkWithDelay
				href={`/project/${projects[nextProjectId].slug}`}
				onClick={() => setSelectedProjectId(projects[nextProjectId].id)}
				delayBeforeLeave={DEFAULT_DELAY_BEFORE_LEAVE}
				delayToStart={0}
				prefetch
			>
				<div className="next-project" onMouseEnter={onEnter} onMouseLeave={onLeave}>
					<div className="container-text">
						<span className="next-project-label">Next project</span>
						<h2 className="next-project-title">{projects[nextProjectId].title}</h2>
						<span ref={lineRef} className="line"></span>
					</div>
					<Image ref={arrowIconRef} src="/svg/arrow.svg" alt="arrow icon" width={30} height={30} />
				</div>
			</LinkWithDelay>
		</div>
	)
}