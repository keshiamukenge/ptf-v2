'use server'

import { Project } from '@/app/lib/types/projects'
import { Work } from '@/app/lib/types/archive'

export async function getSelectedWorksServices(): Promise<Project[]> {
	const response = await fetch('http://localhost:3000/data/selectedWorks.json')
	const selectedWorksData = await response.json()

	return selectedWorksData.projects
}

export async function getWorksServices(): Promise<Work[]> {
	const response = await fetch('http://localhost:3000/data/works.json')
	const worksData = await response.json()

	return worksData.projects
}