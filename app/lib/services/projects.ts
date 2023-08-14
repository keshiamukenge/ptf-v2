'use server'

import { Project } from '@/app/lib/types/projects'
import { Archive } from '@/app/lib/types/archive'

export async function getSelectedWorksServices(): Promise<Project[]> {
	const response = await fetch('http://localhost:3000/data/selectedWorks.json')
	const selectedWorksData = await response.json()

	return selectedWorksData.projects
}

export async function getArchivesServices(): Promise<Archive[]> {
	const response = await fetch('http://localhost:3000/data/archives.json')
	const archivesData = await response.json()

	return archivesData.projects
}