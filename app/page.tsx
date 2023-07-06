'use client'

import { useRef, createRef, useEffect } from 'react'

import './index.scss'
import { useProjects } from '@/app/lib/providers/ProjectsContext'
import Footer from '@/app/lib/components/Footer/Footer'
import LinkWithDelay from '@/app/lib/components/PageTransition/LinkWithDelay'

export default function Home() {
  const { projects, setSelectedProjectId, setProjectsRefs } = useProjects()
  const itemsRefs = useRef<React.MutableRefObject<HTMLLIElement>[]>([])
  itemsRefs.current = projects.map((_, i) => itemsRefs.current[i] ?? createRef());

  useEffect(() => {
    setSelectedProjectId(null)
  }, [])

  useEffect(() => {
    return () => {
      console.log('finished')
    }
  }, [])

  useEffect(() => {
    setProjectsRefs(itemsRefs)
  }, [itemsRefs])
  
  return (
    <main className="home-page">
      <h1>Selected Works</h1>
      <ul className="container-projects">
        {projects.map((project, id) => (
          <li key={project.id} ref={itemsRefs.current[id]}>
            <LinkWithDelay href={`/project/${project.slug}`} onClick={() => setSelectedProjectId(id)} />
          </li>
          ))}
      </ul>
      <Footer fixedPosition />
    </main>
  )
}