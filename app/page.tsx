'use client'

import Image from 'next/image'

import './index.scss'
import { useProjects } from './lib/providers/ProjectsContext'
import Footer from '@/app/lib/components/Footer/Footer'

export default function Home() {
  const { projects } = useProjects()

  return (
    <main className="home-page">
      <h1>Selected Works</h1>
      <ul className="container-projects">
      {projects.map((project) => (
        <li key={project.id}>
          {/* <h2>{project.title}</h2> */}
          <Image src={project.image.src} alt={project.image.alt} width={200} height={200} />
        </li>
      ))}
      </ul>
      <Footer fixedPosition />
    </main>
  )
}