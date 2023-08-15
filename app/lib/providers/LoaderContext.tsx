'use client'

import React, {
  useState,
  useContext,
  createContext,
  useMemo,
  useEffect
} from 'react'

interface IProps {
  children: React.ReactNode
}

export type LoaderContextType = {
  isLoading: boolean
	setIsLoading: (isLoading: boolean) => void
}

const LoaderContext = createContext<LoaderContextType>({
  isLoading: true,
	setIsLoading: () => {},
})

function LoaderProvider({ children }: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const loadingDuration = 4000

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, loadingDuration)
  }, [])

  const value = useMemo(() => {
    return {
      isLoading,
      setIsLoading,
    }
  }, [isLoading, setIsLoading])

  return <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
}

const useLoader = () => useContext(LoaderContext)

export { LoaderProvider, useLoader }
