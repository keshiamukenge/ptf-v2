'use client'

import { useRef, createRef, useEffect, MutableRefObject } from 'react'
import gsap from 'gsap'

import './index.scss'
import { useProjects } from '@/app/lib/providers/ProjectsContext'
import { useScroll } from '@/app/lib/hooks/useScroll'
import Footer from '@/app/lib/components/Footer/Footer'
import LinkWithDelay from '@/app/lib/components/PageTransition/LinkWithDelay'
import TitleAnimation from '@/app/lib/components/Animations/TextAnimations/TitleAnimation'
import Gallery from '@/app/lib/components/WebGL/Gallery/Gallery'
import WebGLWrapper from '@/app/lib/components/WebGL/WebGLWrapper'
// import ImageAnimation from '@/app/lib/components/Animations/ImageAnimation/ImageAnimation'
import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'

export default function Home() {
  const { projects, setSelectedProjectId, setProjectsRefs } = useProjects()
  const { transitionState } = usePageTransitions()
  useScroll()
  const homePageRef = useRef<HTMLElement>(null)
  const itemsRefs: MutableRefObject<MutableRefObject<HTMLLIElement>[]> = useRef<MutableRefObject<HTMLLIElement>[]>([])
  itemsRefs.current = projects.map((_, i) => itemsRefs.current[i] ?? createRef());

  useEffect(() => {
    setSelectedProjectId(null)
  }, [])

  useEffect(() => {
    setProjectsRefs(itemsRefs)
  }, [itemsRefs])

  useEffect(() => {
		if(transitionState === 'start') {
			gsap.to(homePageRef.current, {
				duration: 0.5,
				y: -100,
			})
		}
	}, [transitionState])
  
  return (
    <main className="home-page" ref={homePageRef}>
      <h1>
        <TitleAnimation text="Selected Works" />
      </h1>
      <ul className="container-projects">
        {projects.map((project, id) => (
          <li
            key={project.id}
            ref={itemsRefs.current[id]}
          >
            <LinkWithDelay
              href={`/project/${project.slug}`}
              onClick={() =>
                setSelectedProjectId(id)
              }
              delayBeforeLeave={400}
              delayToStart={0}
            />
              {/* <ImageAnimation src={project.image.src} alt={project.image.alt} width={500} height={500} /> */}
          </li>
          ))}
      </ul>
      <WebGLWrapper>
        <Gallery refs={itemsRefs} />
      </WebGLWrapper>
      <Footer fixedPosition={false} />
    </main>
  )
}