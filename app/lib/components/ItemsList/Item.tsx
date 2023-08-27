'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import gsap from '@/app/lib/utils/gsap'

import TextAnimation from '@/app/lib/components/Animations/TextAnimations/TextAnimation'
import ExternalLink from '@/app/lib/components/Links/ExternalLink'
import { Archive } from '@/app/lib/types/archive'
import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext'
import { useLoader } from '@/app/lib/providers/LoaderContext'

interface IProps {
	item: Archive
}

export default function Item({ item }: IProps) {
	const [showDetails, setShowDetails] = useState<boolean>(false)
	const itemRef = useRef<HTMLLIElement>(null)
	const containerArrowsIconsRef = useRef<HTMLDivElement>(null)
	const containerArrowsIcons = useRef<HTMLDivElement>(null)
	const borderRef = useRef<HTMLSpanElement>(null)
	const { transitionState } = usePageTransitions()
	const { isLoading } = useLoader()

	function showProjectDetails() {
		if(!itemRef.current || !containerArrowsIconsRef.current) return

		gsap.to(itemRef.current, {
			duration: 0.5,
			height: itemRef.current.scrollHeight
		})

		gsap.to(containerArrowsIconsRef.current, {
			duration: 0.2,
			y: 0
		})
	}

	function hideProjectDetails() {
		if(!itemRef.current || !containerArrowsIconsRef.current) return

		gsap.to(itemRef.current, {
			duration: 0.5,
			height: '5rem'
		})

		gsap.to(containerArrowsIconsRef.current, {
			duration: 0.2,
			y: -13
		})
	}

	useEffect(() => {
		if(showDetails) {
			showProjectDetails()
		} else {
			hideProjectDetails()
		}
	}, [showDetails])

	useEffect(() => {
		if(!containerArrowsIcons.current || !borderRef.current) return

		if(!transitionState && !isLoading) {
			gsap.to(containerArrowsIcons.current, {
				delay: 0.4,
				opacity: 1,
				duration: 0.5,
			})
			
			gsap.to(borderRef.current, {
				delay: 0.4,
				width: '100%',
				duration: 0.5,
			})

			return
		}

		if(transitionState === 'finishLeave') {
			gsap.to(containerArrowsIcons.current, {
				delay: 1.2,
				opacity: 1,
				duration: 0.5,
			})

			gsap.to(borderRef.current, {
				delay: 1.2,
				width: '100%',
				duration: 0.5,
			})
		}
	}, [transitionState, isLoading])

	return(
		<li ref={itemRef}>
			<div className="item-header" onClick={() => {
					setShowDetails(!showDetails)
				}}>
				<div className="container-subtitle">
					<span className="subtitle">
						<TextAnimation text="Name"/>
					</span>
					<span className="content">
						<TextAnimation text={item.name} />
					</span>
				</div>
				<div className="container-subtitle container-date">
					<span className="subtitle">
						<TextAnimation text="Date"/>
					</span>
					<span className="content">
						<TextAnimation text={item.date} />
					</span>
				</div>
				<div className="container-subtitle">
					<span className="subtitle">
						<TextAnimation text="Stack"/>
					</span>
					<span className="content">
						<TextAnimation text={item.stack} />
					</span>
				</div>
				<div ref={containerArrowsIcons} className="container-arrows-icons">
					<div className="container-content" ref={containerArrowsIconsRef}>
						<Image className="arrow-up" src="/svg/arrow.svg" alt="arrow icon" width={30} height={30} />
						<Image className="arrow-back" src="/svg/arrow.svg" alt="arrow icon" width={30} height={30} />
					</div>
				</div>
			</div>
			<div className="item-content">
				{item.content?.image && (
					<div className="container-image">
						<Image src={item.content.image.src} alt="project image" width={500} height={300} />
					</div>
				)}
				<p>
					<span className="description-label">Description</span>
					{item.content.description}
				</p>
				<div className="project-link">
					<ExternalLink label="View project" href={item.content.link} />
				</div>
			</div>
			<span ref={borderRef} className="border"></span>
		</li>
	)
}