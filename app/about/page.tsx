'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from '@/app/lib/utils/gsap'

import './style.scss'
import { useScroll } from '@/app/lib/hooks/useScroll'
import Footer from "@/app/lib/components/Footer/Footer"
import TitleAnimation from '@/app/lib/components/Animations/TextAnimations/TitleAnimation'
import ParagraphAnimation from '@/app/lib/components/Animations/TextAnimations/ParagraphAnimation'
import ImageAnimation from '@/app/lib/components/Animations/ImageAnimation/ImageAnimation'
import ScrollBar from '@/app/lib/components/ScrollBar/ScrollBar'
import LoaderWrapper from '@/app/lib/components/Loader/LoaderWrapper'
import { usePageTransitions } from '../lib/providers/PageTransitionsContext'

export default function About() {
	const [imagesUrls, setImagesUrls] = useState<string[]>([])
	const aboutPageRef = useRef<HTMLElement>(null)
	const { transitionState } = usePageTransitions()
	const scroll = useScroll()
	const aboutText = "Hello, I'm Keshia Mukenge, a web developer specialized in front-end web development. After five years of studies and driven by my passion for design and art, I've established my calling in creative web development. My approach aims to harmonize the technicality of code with artistic creativity, with the goal of giving rise to unique web experiences. My portfolio highlights projects focused on animation and 3D (WebGL), areas that I've carefully cultivated throughout my journey."

	useEffect(() => {
		setImagesUrls(['/images/about.webp'])
	}, [setImagesUrls])

	useEffect(() => {
		if(transitionState === 'start') {
			gsap.to(aboutPageRef.current, {
				duration: 0.5,
				y: -100,
			})
		}
	}, [transitionState])

	return (
		<LoaderWrapper imagesUrls={imagesUrls}>
			<main ref={aboutPageRef} className="about-page">
				<ScrollBar scrollInstance={scroll} />
				<div className="main-container">
					<div className="container-image">
						<ImageAnimation src="/images/about.webp" alt="Keshia Mukenge's picture" width={200} height={200} />
					</div>
					<div className="container-text">
						<h1>
							<TitleAnimation text="About" />
						</h1>
						<p>
							<ParagraphAnimation text={aboutText} />
						</p>
					</div>
				</div>
			</main>
			<Footer />
		</LoaderWrapper>
	)
}