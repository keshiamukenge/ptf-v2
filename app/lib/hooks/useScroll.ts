import { useCallback, useEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from '@/app/lib/utils/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useScroll() {
	const [instance, setInstance] = useState<undefined | Lenis>()
	
	const raf = useCallback((time: number) => {
		if(!instance) return
		
		gsap.ticker.add((time)=>{
			instance.raf(time * 1000)
		})
		
		gsap.ticker.lagSmoothing(0)
	}, [instance])
	
	useEffect(() => {
		const lenis = new Lenis()
		setInstance(lenis)

		lenis.on('scroll', ScrollTrigger.update)
	}, []);

	useEffect(() => {
		return () => {
			instance?.destroy()
		}
	}, [instance])
	
	useEffect(() => {
		requestAnimationFrame(raf)
	}, [instance, raf])

	return instance;
}