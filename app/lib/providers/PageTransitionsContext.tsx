'use client'

import React, {
  useState,
  useContext,
  createContext,
  useMemo,
	useEffect,
} from 'react'
import {usePathname} from 'next/navigation'

interface IProps {
  children: React.ReactNode
}

export type PageTransitionsContextType = {
  transitionState: "beforeLeave" | "leave" | "finishLeave" | undefined
	setTransitionState: (transitionState: string | undefined) => void
}

const PageTransitionsContext = createContext<PageTransitionsContextType>({
  transitionState: undefined,
	setTransitionState: () => {},
})

function PageTransitionsProvider({ children }: IProps) {
  const [transitionState, setTransitionState] = useState()

	useEffect(() => {
		console.log(transitionState)
	}, [transitionState])

  const value = useMemo(() => {
    return {
      transitionState,
      setTransitionState,
    }
  }, [transitionState, setTransitionState])

  return <PageTransitionsContext.Provider value={value}>{children}</PageTransitionsContext.Provider>
}

const usePageTransitions = () => useContext(PageTransitionsContext)

export { PageTransitionsProvider, usePageTransitions }
