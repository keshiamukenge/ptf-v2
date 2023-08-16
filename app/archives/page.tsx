'use client'

import { useEffect, useState, useRef } from 'react'
import gsap from '@/app/lib/utils/gsap'

import './style.scss'
import { useScroll } from '@/app/lib/hooks/useScroll'
import ItemsList from '@/app/lib/components/ItemsList/ItemsList'
import TitleAnimation from '@/app/lib/components/Animations/TextAnimations/TitleAnimation'
import Footer from '@/app/lib/components/Footer/Footer'
import ScrollBar from '@/app/lib/components/ScrollBar/ScrollBar'
import LoaderWrapper from '@/app/lib/components/Loader/LoaderWrapper'
import { getArchivesServices } from '@/app/lib/services/projects'
import { usePageTransitions } from '../lib/providers/PageTransitionsContext'
import { Archive } from '@/app/lib/types/archive'

export default function Archives() {
	const [archives, setArchives] = useState<Archive[]>([])
	const [footerIsFixed, setFooterIsFixed] = useState<boolean>(true)
	const archivesPageRef = useRef<HTMLDivElement | null>(null)
	const { transitionState } = usePageTransitions()
	const scroll = useScroll()

	async function getArchives() {
		try {
			const result = await getArchivesServices()

			setArchives(result)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getArchives()
	}, [])

	useEffect(() => {
		if(transitionState === 'start') {
			gsap.to(archivesPageRef.current, {
				duration: 0.5,
				y: -100,
			})
		}
	}, [transitionState])

	return(
		<LoaderWrapper>
			<div>
				<main ref={archivesPageRef} className="archives-page">
					<ScrollBar scrollInstance={scroll} />
					<div className="container-page-title">
						<h1>
							<TitleAnimation text="Archives" />
						</h1>
					</div>
					<ItemsList items={archives} />
				</main>
				<Footer fixedPosition={footerIsFixed} />
			</div>
		</LoaderWrapper>
	)
}