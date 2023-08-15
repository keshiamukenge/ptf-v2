import { useCallback, useEffect, useState } from 'react'

import { breakpoints } from '@/app/lib/theme/responsive'

export function useResponsive() {
	const [device, setDevice] = useState<string>('')

	const handleResize = useCallback(() => {
		if(window.innerWidth < breakpoints.mobile_max) {
			setDevice('mobile')
		}

		if(window.innerWidth >= breakpoints.tablet_min && window.innerWidth < breakpoints.tablet_max) {
			setDevice('tablet')
		}

		if(window.innerWidth >= breakpoints.desktop_min) {
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