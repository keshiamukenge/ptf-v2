'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './style.scss'
import gsap from '@/app/lib/utils/gsap'
import { useScroll } from '@/app/lib/hooks/useScroll'
import { useProjects } from '@/app/lib/providers/ProjectsContext'
import TitleAnimation from '@/app/lib/components/Animations/TextAnimations/TitleAnimation'
import ParagraphAnimation from '@/app/lib/components/Animations/TextAnimations/ParagraphAnimation'
import { Project } from '@/app/lib/types/projects'
import ProjectInformations from '@/app/lib/components/Project/ProjectInformations'
import ProjectImages from '@/app/lib/components/Project/ProjectImages'
import Footer from '@/app/lib/components/Footer/Footer'
import NextProject from '@/app/lib/components/Project/NextProject'
import ExternalLink from '@/app/lib/components/Links/ExternalLink'
import TextAnimation from '@/app/lib/components/Animations/TextAnimations/TextAnimation'
import ScrollBar from '@/app/lib/components/ScrollBar/ScrollBar'
import LoaderWrapper from '@/app/lib/components/Loader/LoaderWrapper'
import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'
import { useResponsive } from '@/app/lib/hooks/useResponsive'
import { LOADER_TRANSITION_DURATION } from '@/app/lib/constants'

interface IProps {
	params: {
		slug: string
	}
}

export default function ProjectPage({ params }: IProps) {
	const [imagesUrls, setImagesUrls] = useState<string[]>([])
	const [currentProject, setCurrentProject] = useState<Project | undefined>()
	const { projects, selectedProjectId, setSelectedProjectId } = useProjects()
	const { transitionState } = usePageTransitions()
	const containerProjectContentRef = useRef<HTMLDivElement | null>(null)
	const projectPageRef = useRef<HTMLElement>(null)
	const containerProjectImages = useRef<HTMLDivElement | null>(null)
	const scroll = useScroll()
	const device = useResponsive()

	const fixePositionOnScroll = useCallback(() => {
		if(!containerProjectContentRef.current || !containerProjectImages.current) return

		gsap.to(containerProjectContentRef.current, {
			scrollTrigger: {
				trigger: containerProjectImages.current,
				start: "bottom +=100%",
				end: "bottom -=100%",
				pinSpacing: false,
				onUpdate: self => {
					if(!containerProjectContentRef.current) return
      
					const multiplier = 1700
					const scrollY = -self.progress * multiplier;
					containerProjectContentRef.current.style.transform = `translate3d(0, ${scrollY}px, 0)`;
				}
			},
			ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		})
	}, [])

	useEffect(() => {
		if(!currentProject) return

    setImagesUrls(currentProject.imagesContent.map(imageContent => imageContent.src))
  }, [projects, setImagesUrls, currentProject])

	useEffect(() => {
		setTimeout(() => {
			fixePositionOnScroll()
		}, LOADER_TRANSITION_DURATION + 500)
	}, [fixePositionOnScroll])

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
		if(!containerProjectContentRef.current || !containerProjectImages.current) return
		
		if(device === 'desktop') {
			fixePositionOnScroll()
		}
	}, [device, fixePositionOnScroll])

	useEffect(() => {
		if(!containerProjectContentRef.current || !containerProjectImages.current) return
		
		if(transitionState === 'start') {
			const topPosition = containerProjectContentRef.current.getBoundingClientRect().top
			ScrollTrigger.killAll()
			gsap.set(containerProjectContentRef.current, {
				y: topPosition,
				top: 0,
				onComplete: () => {
					gsap.to([containerProjectImages.current, containerProjectContentRef.current], {
						duration: 0.5,
						y: "-=100",
					})
				}
			})
		}
	}, [transitionState])

	if(!currentProject) {
		return null
	}

	return (
		<LoaderWrapper imagesUrls={imagesUrls}>
			<main ref={projectPageRef} className="project-page">
				<ScrollBar scrollInstance={scroll}/>
				<div ref={containerProjectContentRef} className="container-project-content">
					<h1>
						<TitleAnimation text={currentProject.title}/>
					</h1>
					<div className="container-project-text">
						<ProjectInformations project={currentProject} />
						{currentProject?.textsContent?.map((textContent, id) => (
							<p key={id}>
								<ParagraphAnimation text={textContent} />
							</p>
						))}
					</div>
					<div className="container-view-site-link">
						<TextAnimation
							text={
								<ExternalLink label="View site" href={currentProject.siteUrl} />
							}
							delay={0.6}
						/>
					</div>
				</div>
				<div className="container-project-images" ref={containerProjectImages}>
					<ProjectImages images={currentProject.imagesContent} />
				</div>
				<NextProject />
			</main>
			<Footer />
		</LoaderWrapper>
	)
}