'use client'

import React, {
  useState,
  useContext,
  createContext,
  useMemo,
  useEffect,
	useCallback,
  useRef
} from 'react'

import { getProjectsServices } from '@/app/lib/services/projects'
import { Project } from '@/app/lib/types/projects'

interface IProps {
  children: React.ReactNode
}

export type ProjectsContextType = {
  projects: Project[]
	setProjects: (project: Project[]) => void
  selectedPlaneUUID: string | undefined
  setSelectedPlaneUUID: (uuid: string | undefined) => void
}

const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
	setProjects: () => {},
  selectedPlaneUUID: undefined,
  setSelectedPlaneUUID: () => {},
})

function ProjectsProvider({ children }: IProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedPlaneUUID, setSelectedPlaneUUID] = useState<string | undefined>()

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

  const value = useMemo(() => {
    return {
      projects,
      setProjects,
      selectedPlaneUUID,
      setSelectedPlaneUUID,
    }
  }, [projects, setProjects, selectedPlaneUUID, setSelectedPlaneUUID])

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
}

const useProjects = () => useContext(ProjectsContext)

export { ProjectsProvider, useProjects }
