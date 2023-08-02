'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

import ExternalLink from '@/app/lib/components/ExternalLink/ExternalLink'
import { Work } from '@/app/lib/types/works'

interface IProps {
	item: Work
}

export default function Item({ item }: IProps) {
	const [showContent, setShowContent] = useState<boolean>(false)
	const itemRef = useRef<HTMLLIElement>(null)
	const containerArrowsIconsRef = useRef<HTMLDivElement>(null)

	function showProjectContent() {
		if(!itemRef.current) return

		gsap.to(itemRef.current, {
			duration: 0.5,
			height: itemRef.current.scrollHeight
		})

		gsap.to(containerArrowsIconsRef.current, {
			duration: 0.2,
			y: 0
		})
	}

	function hideProjectContent() {
		if(!itemRef.current) return

		gsap.to(itemRef.current, {
			duration: 0.5,
			height: 85
		})

		gsap.to(containerArrowsIconsRef.current, {
			duration: 0.2,
			y: -13
		})
	}

	useEffect(() => {
		if(showContent) {
			showProjectContent()
		} else {
			hideProjectContent()
		}
	}, [showContent])

	return(
		<li ref={itemRef}>
			<div className="item-header" onClick={() => {
					setShowContent(!showContent)
				}}>
				<div className="container-subtitle">
					<span className="subtitle">Name</span>
					<span className="content">{item.name}</span>
				</div>
				<div className="container-subtitle">
					<span className="subtitle">Date</span>
					<span className="content">{item.date}</span>
				</div>
				<div className="container-subtitle">
					<span className="subtitle">Stack</span>
					<span className="content">{item.stack}</span>
				</div>
				<div className="container-arrows-icons">
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
		</li>
	)
}