'use client'

import { useRef, createRef, useEffect, MutableRefObject, useState } from 'react'
import gsap from '@/app/lib/utils/gsap'

import './style.scss'
import { useProjects } from '@/app/lib/providers/ProjectsContext'
import { useScroll } from '@/app/lib/hooks/useScroll'
import Footer from '@/app/lib/components/Footer/Footer'
import LinkWithDelay from '@/app/lib/components/Links/LinkWithDelay'
import TitleAnimation from '@/app/lib/components/Animations/TextAnimations/TitleAnimation'
import ImageAnimation from '@/app/lib/components/Animations/ImageAnimation/ImageAnimation'
import ScrollBar from '@/app/lib/components/ScrollBar/ScrollBar'
import LoaderWrapper from '@/app/lib/components/Loader/LoaderWrapper'
import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'

export default function Home() {
  const [startLoader, setStartLoader] = useState<boolean>(false)
  const [imagesUrls, setImagesUrls] = useState<string[]>([])
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null)
  const { projects, setSelectedProjectId, setProjectsRefs } = useProjects()
  const { transitionState } = usePageTransitions()
  const scroll = useScroll()
  const homePageRef = useRef<HTMLElement>(null)
  const itemsRefs: MutableRefObject<MutableRefObject<HTMLLIElement>[]> = useRef<MutableRefObject<HTMLLIElement>[]>([])
  itemsRefs.current = projects.map((_, i) => itemsRefs.current[i] ?? createRef());

  useEffect(() => {
    setImagesUrls(projects.map(project => project.image.src))
  }, [projects, setImagesUrls])

  useEffect(() => {
    setSelectedProjectId(null)
  }, [setSelectedProjectId])

  useEffect(() => {
    setProjectsRefs(itemsRefs)
  }, [itemsRefs, setProjectsRefs])

  useEffect(() => {
		if(transitionState === 'start') {
			gsap.to(homePageRef.current, {
				duration: 0.5,
				y: -100,
			})
		}
	}, [transitionState])
  
  return (
    <LoaderWrapper imagesUrls={imagesUrls}>
      <main className="home-page" ref={homePageRef}>
        <ScrollBar scrollInstance={scroll}/>
        <h1>
          <TitleAnimation text="Selected Works" />
        </h1>
        <ul className="container-projects">
          {projects.map((project, id) => (
            <li
            key={project.id}
            ref={itemsRefs.current[id]}
            onMouseEnter={() => setHoveredProjectId(id)}
            onMouseLeave={() => setHoveredProjectId(null)}
            >
              <LinkWithDelay
                href={`/project/${project.slug}`}
                onClick={() =>
                  setSelectedProjectId(id)
                }
                delayBeforeLeave={400}
                delayToStart={0}
                prefetch
              >
                <ImageAnimation
                  src={project.image.src}
                  alt={project.image.alt}
                  width={500}
                  height={500}
                  isHovered={id === hoveredProjectId}
                />
              </LinkWithDelay>
              <div className="container-project-infos">
                <span>{project.title}</span>
              </div>
            </li>
            ))}
        </ul>
        <Footer />
      </main>
    </LoaderWrapper>
  )
}