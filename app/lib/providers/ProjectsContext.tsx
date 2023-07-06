'use client'

import React, {
  useState,
  useContext,
  createContext,
  useMemo,
  useEffect,
	useCallback,
  useRef,
  use
} from 'react'

import { getProjectsServices } from '@/app/lib/services/projects'
import { Project } from '@/app/lib/types/projects'

interface IProps {
  children: React.ReactNode
}

export type ProjectsContextType = {
  projects: Project[]
	setProjects: (project: Project[]) => void
  selectedProjectId: number | null
  setSelectedProjectId: (id: number | null) => void
  projectsRefs?: React.MutableRefObject<React.MutableRefObject<HTMLLIElement>[]>
  setProjectsRefs?: (refs: React.MutableRefObject<HTMLLIElement>[]) => void
}

const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
	setProjects: () => {},
  selectedProjectId: null,
  setSelectedProjectId: () => {},
  projectsRefs: undefined,
  setProjectsRefs: undefined,
})

function ProjectsProvider({ children }: IProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [projectsRefs, setProjectsRefs] = useState<React.MutableRefObject<React.MutableRefObject<HTMLLIElement>[]>>()

  const getProjects = useCallback(async () => {
    try {
      const response = await getProjectsServices()
      setProjects(response)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    getProjects()
  }, [getProjects])

  useEffect(() => {
    console.log('selected id', selectedProjectId)
  }, [selectedProjectId])

  const value = useMemo(() => {
    return {
      projects,
      setProjects,
      selectedProjectId,
      setSelectedProjectId,
      projectsRefs,
      setProjectsRefs,
    }
  }, [projects, setProjects, selectedProjectId, setSelectedProjectId, projectsRefs, setProjectsRefs])

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
}

const useProjects = () => useContext(ProjectsContext)

export { ProjectsProvider, useProjects }
