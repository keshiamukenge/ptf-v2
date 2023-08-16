'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

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
	const aboutPageRef = useRef<HTMLElement>(null)
	const { transitionState } = usePageTransitions()
	const scroll = useScroll()

	useEffect(() => {
		if(transitionState === 'start') {
			gsap.to(aboutPageRef.current, {
				duration: 0.5,
				y: -100,
			})
		}
	}, [transitionState])

	return (
		<LoaderWrapper>
			<main ref={aboutPageRef} className="about-page">
				<ScrollBar scrollInstance={scroll} />
				<div className="main-container">
					<div className="container-image">
						<ImageAnimation src="/images/about.webp" alt="Keshia mukenge's picture" width={200} height={200} />
					</div>
					<div className="container-text">
						<h1>
							<TitleAnimation text="About" />
						</h1>
						<p>
							<ParagraphAnimation
								text="Lorem ipsum dolor sit amet consectetur. Duis nec semper velit sapien sollicitudin habitasse faucibus. Tempus congue sed ornare commodo justo netus. Magna pretium nec vitae interdum. Vulputate integer tincidunt malesuada nunc mauris tortor enim odio. Lorem ipsum dolor sit amet consectetur. Duis nec semper velit sapien sollicitudin habitasse faucibus. Tempus congue sed ornare commodo justo netus. Magna pretium nec vitae interdum. Vulputate integer tincidunt malesuada nunc mauris tortor enim odio."
							/>
						</p>
					</div>
				</div>
				<Footer fixedPosition />
			</main>
		</LoaderWrapper>
	)
}