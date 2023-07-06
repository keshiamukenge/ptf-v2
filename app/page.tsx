'use client'

import { useRef, createRef, useEffect } from 'react'

import './index.scss'
import Gallery from '@/app/lib/components/WebGL/Gallery/Gallery'
import { useProjects } from './lib/providers/ProjectsContext'
import Footer from '@/app/lib/components/Footer/Footer'
import WebGLWrapper from '@/app/lib/components/WebGL/WebGLWrapper'
import LinkWithDelay from '@/app/lib/components/PageTransition/LinkWithDelay'

export default function Home() {
  const { projects, setSelectedProjectId } = useProjects()
  const itemsRefs = useRef<React.MutableRefObject<HTMLLIElement>[]>([])
  itemsRefs.current = projects.map((_, i) => itemsRefs.current[i] ?? createRef());

  useEffect(() => {
    return () => {
      console.log('finished')
    }
  }, [])

  return (
    <main className="home-page">
      <h1>Selected Works</h1>
      <ul className="container-projects">
        {projects.map((project, id) => (
          <li key={project.id} ref={itemsRefs.current[id]}>
            <LinkWithDelay href="/about" onClick={() => setSelectedProjectId(id)} />
          </li>
          ))}
      </ul>
      <WebGLWrapper>
        <Gallery refs={itemsRefs} />
      </WebGLWrapper>
      <Footer fixedPosition />
    </main>
  )
}