'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from '@/app/lib/utils/gsap'

import './style.scss'
import { useProjects } from '@/app/lib/providers/ProjectsContext'
import LinkWithDelay from '@/app/lib/components/Links/LinkWithDelay'
import { Project } from "@/app/lib/types/projects"
import { useResponsive } from '@/app/lib/hooks/useResponsive'

interface IProps {
	project: Project
}

export default function NextProject({ project }: IProps) {
	const lineRef = useRef<HTMLHeadingElement>(null)
	const arrowIconRef = useRef<HTMLImageElement>(null)
	const nextProjectContainer = useRef<HTMLDivElement>(null)
	const { setSelectedProjectId, projects, nextProjectId } = useProjects()
	const device = useResponsive()

	function onEnter() {
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

	if(typeof nextProjectId !== 'number') {
		return null
	}

	return(
		<div ref={nextProjectContainer}>
			<LinkWithDelay
				href={`/project/${projects[nextProjectId].slug}`}
				onClick={() => setSelectedProjectId(projects[nextProjectId].id)}
				delayBeforeLeave={400}
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