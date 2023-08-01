import { useEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useScroll() {
	const [instance, setInstance] = useState<undefined | Lenis>(undefined)
	gsap.registerPlugin(ScrollTrigger)
	
	function raf(time: number) {
		if(!instance) return
		
		gsap.ticker.add((time)=>{
			instance.raf(time * 1000)
		})
		
		gsap.ticker.lagSmoothing(0)
	}
	
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
	}, [instance])

	return instance;
}