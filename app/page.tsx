'use client'

import { useRef, createRef } from 'react'
import Link from 'next/link'

import './index.scss'
import Gallery from '@/app/lib/components/WebGL/Gallery/Gallery'
import { useProjects } from './lib/providers/ProjectsContext'
import Footer from '@/app/lib/components/Footer/Footer'
import WebGLWrapper from '@/app/lib/components/WebGL/WebGLWrapper'

export default function Home() {
  const { projects } = useProjects()
  const itemsRefs = useRef<React.MutableRefObject<HTMLLIElement>[]>([])
  itemsRefs.current = projects.map((_, i) => itemsRefs.current[i] ?? createRef());

  return (
    <main className="home-page">
      <h1>Selected Works</h1>
      <ul className="container-projects">
        {projects.map((project, id) => (
          <li key={project.id} ref={itemsRefs.current[id]}>
            <Link href="/about"></Link>
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