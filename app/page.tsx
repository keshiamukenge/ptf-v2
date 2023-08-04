'use client'

import { useRef, createRef, useEffect, MutableRefObject, useCallback } from 'react'
import gsap from 'gsap'

import './style.scss'
import { useProjects } from '@/app/lib/providers/ProjectsContext'
import { useScroll } from '@/app/lib/hooks/useScroll'
import Footer from '@/app/lib/components/Footer/Footer'
import LinkWithDelay from '@/app/lib/components/PageTransition/LinkWithDelay'
import TitleAnimation from '@/app/lib/components/Animations/TextAnimations/TitleAnimation'
import ImageAnimation from '@/app/lib/components/Animations/ImageAnimation/ImageAnimation'
import ScrollBar from '@/app/lib/components/ScrollBar/ScrollBar'
import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'

export default function Home() {
  const { projects, setSelectedProjectId, setProjectsRefs } = useProjects()
  const { transitionState } = usePageTransitions()
  const scroll = useScroll()
  const homePageRef = useRef<HTMLElement>(null)
  const projectsTitlesRef: MutableRefObject<MutableRefObject<HTMLSpanElement>[]> = useRef<MutableRefObject<HTMLSpanElement>[]>([])
  const itemsRefs: MutableRefObject<MutableRefObject<HTMLLIElement>[]> = useRef<MutableRefObject<HTMLLIElement>[]>([])
  itemsRefs.current = projects.map((_, i) => itemsRefs.current[i] ?? createRef());
  projectsTitlesRef.current = projects.map((_, i) => projectsTitlesRef.current[i] ?? createRef());

  const onMouseEnter = useCallback((id: number) => {
    if(!projectsTitlesRef.current[id].current) return

    gsap.to(projectsTitlesRef.current[id].current, {
      duration: 0.5,
      y: 0,
    })
  }, [])

  const onMouseLeave = useCallback((id: number) => {
    if(!projectsTitlesRef.current[id].current) return

    gsap.to(projectsTitlesRef.current[id].current, {
      duration: 0.5,
      y: '-100%',
      onComplete: () => {
        gsap.set(projectsTitlesRef.current[id].current, {
          y: '100%'
        })
      }
    })
  }, [])

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
      <ScrollBar scrollInstance={scroll}/>
      <h1>
        <TitleAnimation text="Selected Works" />
      </h1>
      <ul className="container-projects">
        {projects.map((project, id) => (
          <li
            key={project.id}
            ref={itemsRefs.current[id]}
            onMouseEnter={() => onMouseEnter(id)}
            onMouseLeave={() => onMouseLeave(id)}
          >
            <LinkWithDelay
              href={`/project/${project.slug}`}
              onClick={() =>
                setSelectedProjectId(id)
              }
              delayBeforeLeave={400}
              delayToStart={0}
            >
              <ImageAnimation src={project.image.src} alt={project.image.alt} width={500} height={500} />
            </LinkWithDelay>
            <div className="container-project-infos">
              <span ref={projectsTitlesRef.current[id]}>{project.title}</span>
            </div>
          </li>
          ))}
      </ul>
      <Footer />
    </main>
  )
}