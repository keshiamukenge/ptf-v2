'use client'

import { useEffect, useRef } from 'react';
import gsap from '@/app/lib/utils/gsap';

import BasicImage from "./BasicImage";
import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext';
import { useLoader } from '@/app/lib/providers/LoaderContext';

interface IProps {
	src: string;
	alt: string;
	width: number;
	height: number;
	isHovered?: boolean;
}

export default function ImageAnimation({ src, alt, width, height, isHovered }: IProps) {
	const imgRef = useRef<HTMLImageElement>(null);
	const { transitionState } = usePageTransitions();
	const { isLoading } = useLoader();

	useEffect(() => {
		if(!imgRef.current) return

		if(isHovered) {
			gsap.to(imgRef.current, {
				duration: 1,
				scale: 1.05,
			})
		} else {
			gsap.to(imgRef.current, {
				duration: 1,
				scale: 1,
			})
		}
	}, [isHovered])

	useEffect(() => {
		if(!transitionState && !isLoading) {
			gsap.to(imgRef.current, {
				opacity: 1,
				duration: 0.8,
			})
		}

		if(transitionState === 'finishLeave') {
			gsap.to(imgRef.current, {
				delay: 0.5,
				opacity: 1,
				duration: 0.8,
			})
		}
	}, [transitionState, isLoading]);

	return (
		<div className='container-image-animation'>
			<BasicImage imageRef={imgRef} src={src} alt={alt} width={width} height={height} />
		</div>
	)
}