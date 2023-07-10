import { use, useEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'

export function useScroll() {
	const [instance, setInstance] = useState<undefined | Lenis>(undefined)

	function raf(time: number) {
		if(!instance) return

		instance.raf(time)
		requestAnimationFrame(raf)
	}

	useEffect(() => {
		const lenis = new Lenis()
		setInstance(lenis)
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