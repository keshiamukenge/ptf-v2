'use client'

import { useRef, createRef } from 'react'

import './index.scss'
import Gallery from '@/app/lib/components/WebGL/Gallery'
import { useProjects } from './lib/providers/ProjectsContext'
import Footer from '@/app/lib/components/Footer/Footer'
import WebGLWrapper from '@/app/lib/components/WebGL/WebGLWrapper'

export default function Home() {
  const { projects } = useProjects()
  const itemsRefs = useRef<HTMLLIElement[]>([])
  itemsRefs.current = projects.map((_, i) => itemsRefs.current[i] ?? createRef());

  return (
    <main className="home-page">
      <h1>Selected Works</h1>
      <ul className="container-projects">
        {projects.map((project, id) => (
          <li key={project.id} ref={itemsRefs.current[id]}>
            {/* <Image src={project.image.src} alt={project.image.alt} width={200} height={200} /> */}
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