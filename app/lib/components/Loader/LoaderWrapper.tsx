'use client'

import { useState, useEffect } from 'react'

import Loader from '@/app/lib/components/Loader/Loader'
import { useLoader } from '@/app/lib/providers/LoaderContext'

interface IProps {
	children: React.ReactNode
}

export default function LoaderWrapper({ children }: IProps) {
	const [percentOnProgress, setPercentOnProgress] = useState<boolean>(true)
	const { isLoading, setIsLoading } = useLoader()
	const duration = 2000

  useEffect(() => {
    setTimeout(() => {
			setPercentOnProgress(false)
    }, duration)
  }, [setIsLoading])

	if(!isLoading) return children

	return(
		<Loader percentOnProgress={percentOnProgress} duration={duration} />
	)
}