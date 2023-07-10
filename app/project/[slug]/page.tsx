'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import './style.scss'
import { useProjects } from '@/app/lib/providers/ProjectsContext'
import { useScroll } from '@/app/lib/hooks/useScroll'
import TitleAnimation from '@/app/lib/components/Animations/TextAnimations/TitleAnimation'
import ParagraphAnimation from '@/app/lib/components/Animations/TextAnimations/ParagraphAnimation'
import { Project } from '@/app/lib/types/projects'
import ProjectInformations from '@/app/lib/components/Project/ProjectInformations'
import ProjectImages from '@/app/lib/components/Project/ProjectImages'
import Footer from '@/app/lib/components/Footer/Footer'

interface IProps {
	params: {
		slug: string
	}
}

export default function ProjectPage({ params }: IProps) {
	const [currentProject, setCurrentProject] = useState<Project | undefined>()
	const { projects, selectedProjectId } = useProjects()
	const scroll = useScroll()
	const router = useRouter()
	
	useEffect(() => {
		if(!selectedProjectId) {
			projects.forEach(project => {
				if(project.slug === params.slug) {
					setCurrentProject(project)

					return
				}
			})
		} else {
			setCurrentProject(projects[selectedProjectId])
		}
	}, [projects])

	if(!currentProject) {
		return null
	}

	return (
		<>
			<main className="project-page">
				<div className="container-project-content">
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
				</div>
				<div className="container-project-images">
					<ProjectImages images={currentProject.imagesContent} />
				</div>
			</main>
			<Footer />
		</>
	)
}