'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import gsap, { Expo } from 'gsap'

import './style.scss'

interface IProps {
	percentOnProgress: boolean
	duration: number
}

export default function Loader({ percentOnProgress, duration }: IProps) {
	const [progress, setProgress] = useState<number>(0)
	const [intervalId, setIntervalId] = useState<null | ReturnType<typeof setInterval>>(null)
	const imageRef = useRef(null)
	const starBranch1 = useRef(null)
	const starBranch2 = useRef(null)
	const starBranch3 = useRef(null)
	const starBranch4 = useRef(null)
	const backgroundRef = useRef(null)
	const progressRef = useRef(null)
	const intervalDuration = duration / 100
	const backgroundTimeline = gsap
		.timeline({ paused: true, delay: 0.5 })
		.to(backgroundRef.current, {
			width: '40%',
			height: '20%',
			duration: 0.75,
			ease: Expo.easeIn,
		})
		.to(backgroundRef.current, {
			width: '100vw',
			height: '100vh',
			duration: 0.75,
			expo: Expo.easeOut,
		})

	const startInterval = useCallback(() => {
		return setInterval(() => {
			setProgress(prev => prev + 1)
		}, intervalDuration)
	}, [intervalDuration])

	const starAnimation = useCallback(() => {
		gsap.to(starBranch1.current, {
			rotate: 90,
			duration: 0.5,
			transformOrigin: 'center',
		})

		gsap.to(starBranch4.current, {
			rotate: "-=45",
			duration: 0.5,
			transformOrigin: 'center',
		})

		gsap.to(starBranch3.current, {
			rotate: "+=45",
			duration: 0.5,
			transformOrigin: 'center',
		})
	}, [])

	useEffect(() => {
		gsap.to(imageRef.current,{
			rotate: 360,
			duration: 2.5,
		})
	}, [])

	useEffect(() => {
		if(!percentOnProgress) {
			starAnimation()
		};

		setIntervalId(startInterval)
		
	}, [percentOnProgress, intervalDuration, startInterval, starAnimation])

	useEffect(() => {
		if(progress >= 100 && intervalId) {
			clearInterval(intervalId)
			gsap.set(backgroundRef.current, {
				opacity: 1,
				delay: 0.5,
			})
			gsap.to(progressRef.current, {
				y: '100%',
				duration: 1,
				delay: 0.5,
			})

			backgroundTimeline.play()
		}
	}, [progress, intervalId, backgroundTimeline])

	return(
		<div className="Loader">
			<div className="container">
				<svg ref={imageRef} width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clip-path="url(#clip0_1316_2)">
						<path ref={starBranch1} d="M28.525 -0.00572643L25.777 0.0288086L26.4678 54.997L29.2158 54.9624L28.525 -0.00572643Z" fill="#F0EDE5"/>
						<path ref={starBranch2} d="M54.9622 25.7827L-0.00610352 26.4639L0.0279519 29.2119L54.9962 28.5307L54.9622 25.7827Z" fill="#F0EDE5"/>
						<path ref={starBranch3} d="M45.7104 6.86569L7.32361 46.2158L9.29087 48.1349L47.6776 8.78479L45.7104 6.86569Z" fill="#F0EDE5"/>
						<path ref={starBranch4} d="M9.29438 6.86884L7.32678 8.7876L45.7067 48.1444L47.6743 46.2257L9.29438 6.86884Z" fill="#F0EDE5"/>
					</g>
					<defs>
						<clipPath id="clip0_1316_2">
							<rect width="55" height="55" fill="white"/>
						</clipPath>
					</defs>
				</svg>
				<span ref={backgroundRef} className="background"></span>
				<span className="container-progress">
					<span ref={progressRef} className="progress">{progress}%</span>
				</span>
			</div>
		</div>
	)
}