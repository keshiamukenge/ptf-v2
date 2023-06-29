'use server'

import { Project } from '@/app/lib/types/projects'

export async function getProjectsServices(): Promise<Project[]> {
	const response = await fetch('http://localhost:3000/data/projects.json')
	const projectsData = await response.json()

	return projectsData.projects
}