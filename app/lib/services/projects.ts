'use server'

import { Project } from '@/app/lib/types/projects'
import { Archive } from '@/app/lib/types/archive'

export async function getSelectedWorksServices(): Promise<Project[]> {
	const response = await fetch(`${process.env.API_BASE_URL}/data/selectedWorks.json`)
	const selectedWorksData = await response.json()

	return selectedWorksData.projects
}

export async function getArchivesServices(): Promise<Archive[]> {
	const response = await fetch(`${process.env.API_BASE_URL}/data/archives.json`)
	const archivesData = await response.json()

	return archivesData.projects
}