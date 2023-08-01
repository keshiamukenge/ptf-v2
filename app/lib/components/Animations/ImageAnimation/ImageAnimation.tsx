'use client'

import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';

import BasicImage from "./BasicImage";
import { usePageTransitions } from '@/app/lib/providers/PageTransitionsContext';

interface IProps {
	src: string;
	alt: string;
	width: number;
	height: number;
}

export default function ImageAnimation({ src, alt, width, height }: IProps) {
	const imgRef = useRef<HTMLImageElement>(null);
	const { transitionState } = usePageTransitions();

	useEffect(() => {
		if(!transitionState) {
			gsap.to(imgRef.current, {
				opacity: 1,
				duration: 0.8,
			})
		}

		if(transitionState === 'start') {
			gsap.to(imgRef.current, {
				duration: 0.3,
				opacity: 0,
			})
		}

		if(transitionState === 'finishLeave') {
			gsap.to(imgRef.current, {
				delay: 1,
				opacity: 1,
				duration: 0.5,
			})
		}
	}, [transitionState]);

	

	return <BasicImage imageRef={imgRef} src={src} alt={alt} width={width} height={height} />
}