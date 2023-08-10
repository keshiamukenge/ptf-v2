'use client'

import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

import './style.scss'
import { useScroll } from '@/app/lib/hooks/useScroll'
import ItemsList from '@/app/lib/components/ItemsList/ItemsList'
import TitleAnimation from '@/app/lib/components/Animations/TextAnimations/TitleAnimation'
import Footer from '@/app/lib/components/Footer/Footer'
import ScrollBar from '@/app/lib/components/ScrollBar/ScrollBar'
import LoaderWrapper from '@/app/lib/components/Loader/LoaderWrapper'
import { getWorksServices } from '@/app/lib/services/projects'
import { usePageTransitions } from '../lib/providers/PageTransitionsContext'
import { Work } from '@/app/lib/types/works'

export default function Works() {
	const [works, setWorks] = useState<Work[]>([])
	const [footerIsFixed, setFooterIsFixed] = useState<boolean>(true)
	const worksPageRef = useRef<HTMLDivElement | null>(null)
	const { transitionState } = usePageTransitions()
	const scroll = useScroll()

	async function getWorks() {
		try {
			const result = await getWorksServices()

			setWorks(result)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getWorks()
	}, [])

	useEffect(() => {
		if(transitionState === 'start') {
			gsap.to(worksPageRef.current, {
				duration: 0.5,
				y: -100,
			})
		}
	}, [transitionState])

	return(
		<LoaderWrapper>
			<div>
				<main ref={worksPageRef} className="works-page">
					<ScrollBar scrollInstance={scroll} />
					<div className="container-page-title">
						<h1>
							<TitleAnimation text="Works" />
						</h1>
					</div>
					<ItemsList items={works} />
				</main>
				<Footer fixedPosition={footerIsFixed} />
			</div>
		</LoaderWrapper>
	)
}