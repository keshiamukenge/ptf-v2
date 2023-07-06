'use client'

import Gallery from '@/app/lib/components/WebGL/Gallery/Gallery'
import { useProjects } from '@/app/lib/providers/ProjectsContext'

export default function Webgl() {
	const { projectsRefs } = useProjects()

	return <Gallery refs={projectsRefs} />
}