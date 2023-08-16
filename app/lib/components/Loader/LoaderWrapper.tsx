'use client'

import { useState, useEffect } from 'react'

import Loader from '@/app/lib/components/Loader/Loader'
import { useLoader } from '@/app/lib/providers/LoaderContext'
import { LOADINGDURATION } from '@/app/lib/constants'

interface IProps {
	children: React.ReactNode
}

export default function LoaderWrapper({ children }: IProps) {
	const [percentOnProgress, setPercentOnProgress] = useState<boolean>(true)
	const { isLoading, setIsLoading } = useLoader()
	const duration = LOADINGDURATION - 2000

  useEffect(() => {
    setTimeout(() => {
			setPercentOnProgress(false)
    }, duration)
  }, [setIsLoading, duration])

	if(!isLoading) return children

	return(
		<Loader percentOnProgress={percentOnProgress} duration={duration} />
	)
}