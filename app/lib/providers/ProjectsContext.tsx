'use client'

import React, {
  useState,
  useContext,
  createContext,
  useMemo,
  useEffect,
	useCallback,
  MutableRefObject,
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
  projectsRefs: MutableRefObject<MutableRefObject<HTMLLIElement>[]> | null
  setProjectsRefs: (refs: MutableRefObject<MutableRefObject<HTMLLIElement>[]>) => void
  nextProjectId: number | null
  setNextProjectId: (id: number | null) => void
}

const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
	setProjects: () => {},
  selectedProjectId: null,
  setSelectedProjectId: () => {},
  projectsRefs: null,
  setProjectsRefs: () => {},
  nextProjectId: null,
  setNextProjectId: () => {},
})

function ProjectsProvider({ children }: IProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [projectsRefs, setProjectsRefs] = useState<MutableRefObject<React.MutableRefObject<HTMLLIElement>[]>>(null)
  const [nextProjectId, setNextProjectId] = useState<number | null>(null)

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
    if(selectedProjectId === null) return

    if(selectedProjectId === projects.length - 1) {
      setNextProjectId(0)

      return
    }

    setNextProjectId(selectedProjectId + 1)
  }, [selectedProjectId, projects, setNextProjectId])

  const value = useMemo(() => {
    return {
      projects,
      setProjects,
      selectedProjectId,
      setSelectedProjectId,
      projectsRefs,
      setProjectsRefs,
      nextProjectId,
      setNextProjectId,
    }
  }, [projects, setProjects, selectedProjectId, setSelectedProjectId, projectsRefs, setProjectsRefs, nextProjectId, setNextProjectId])

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
}

const useProjects = () => useContext(ProjectsContext)

export { ProjectsProvider, useProjects }
