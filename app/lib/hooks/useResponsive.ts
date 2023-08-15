import { useCallback, useEffect, useState } from 'react'

export function useResponsive() {
	const [device, setDevice] = useState<string>('')

	const handleResize = useCallback(() => {
		if(window.innerWidth < 768) {
			setDevice('mobile')
		}

		if(window.innerWidth >= 768 && window.innerWidth < 1200) {
			setDevice('tablet')
		}

		if(window.innerWidth >= 1200) {
			setDevice('desktop')
		}
	}, [])

	useEffect(() => {
		handleResize()
	}, [handleResize])

	useEffect(() => {		
		window.addEventListener('resize', handleResize)
		
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}
	, [handleResize])

	return device
}