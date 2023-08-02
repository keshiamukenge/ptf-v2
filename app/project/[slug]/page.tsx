'use client'

import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

import './style.scss'
import { useProjects } from '@/app/lib/providers/ProjectsContext'
import { useScroll } from '@/app/lib/hooks/useScroll'
import TitleAnimation from '@/app/lib/components/Animations/TextAnimations/TitleAnimation'
import ParagraphAnimation from '@/app/lib/components/Animations/TextAnimations/ParagraphAnimation'
import { Project } from '@/app/lib/types/projects'
import ProjectInformations from '@/app/lib/components/Project/ProjectInformations'
import ProjectImages from '@/app/lib/components/Project/ProjectImages'
import Footer from '@/app/lib/components/Footer/Footer'
import NextProject from '@/app/lib/components/Project/NextProject'
import ExternalLink from '@/app/lib/components/ExternalLink/ExternalLink'
import TextAnimation from '@/app/lib/components/Animations/TextAnimations/TextAnimation'
import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'

interface IProps {
	params: {
		slug: string
	}
}

export default function ProjectPage({ params }: IProps) {
	const [currentProject, setCurrentProject] = useState<Project | undefined>()
	const { projects, selectedProjectId, setSelectedProjectId } = useProjects()
	const { transitionState } = usePageTransitions()
	const containerProjectContentRef = useRef<HTMLDivElement | null>(null)
	const projectPageRef = useRef<HTMLElement>(null)
	const scroll = useScroll()
	const containerProjectImages = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		projects.forEach(project => {
			if(project.slug === params.slug) {
				setCurrentProject(project)
				setSelectedProjectId(project.id)

				return
			}
		})
	}, [selectedProjectId, params.slug, projects, setCurrentProject, setSelectedProjectId])

	useEffect(() => {
		gsap.to(containerProjectContentRef.current, {
			scrollTrigger: {
				trigger: containerProjectImages.current,
				start: 'bottom +=100%',
				end: 'bottom -=100%',
				scrub: true,
			},
			y: "-200vh",
			ease: 'none',
		})
	})

	useEffect(() => {
		if(transitionState === 'start') {
			gsap.to(projectPageRef.current, {
				duration: 0.5,
				y: -100,
			})
		}
	}, [transitionState])

	if(!currentProject) {
		return null
	}

	return (
		<>
			<main ref={projectPageRef} className="project-page">
				<div ref={containerProjectContentRef} className="container-project-content">
					<h1>
						<TitleAnimation text={currentProject.title}/>
					</h1>
					<div className="container-project-text">
						<ProjectInformations project={currentProject} />
						{currentProject?.textsContent?.map((textContent, id) => (
							<p key={id}>
								<ParagraphAnimation
									target="project-text-content"
									text={textContent}
									/>
							</p>
						))}
					</div>
					<div className="container-view-site-link">
						<TextAnimation
							text={
								<ExternalLink label="View site" href={currentProject.siteUrl} />
							}
						/>
					</div>
				</div>
				<div className="container-project-images" ref={containerProjectImages}>
					<ProjectImages images={currentProject.imagesContent} />
				</div>
				<NextProject project={currentProject} />
			</main>
			<Footer />
		</>
	)
}