'use client'

import React, {
  useState,
  useContext,
  createContext,
  useMemo,
} from 'react'

type TransitionState = "beforeLeave" | "leave" | "finishLeave" | "start" | undefined

interface IProps {
  children: React.ReactNode
}

export type PageTransitionsContextType = {
  transitionState: TransitionState
	setTransitionState: (transitionState: TransitionState) => void
}

const PageTransitionsContext = createContext<PageTransitionsContextType>({
  transitionState: undefined,
	setTransitionState: () => {},
})

function PageTransitionsProvider({ children }: IProps) {
  const [transitionState, setTransitionState] = useState<TransitionState>()

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
