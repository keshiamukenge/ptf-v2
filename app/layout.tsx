import React from 'react'
import { Inter } from 'next/font/google'

import './globals.scss'
import '@/app/lib/assets/scss/reset.scss'
import Transition from '@/app/lib/components/PageTransition/Transition'
import PageTransitionWrapper from '@/app/lib/components/PageTransition/PageTransitionWrapper'
import Header from '@/app/lib/components/Header/Header'
import { ProjectsProvider } from '@/app/lib/providers/ProjectsContext'
import { LoaderProvider } from '@/app/lib/providers/LoaderContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Keshia Mukenge | Portfolio',
  description: 'Keshia Mukenge is a freelance front-end developer based in Bordeaux, France.',
}

export default function RootLayout(props: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoaderProvider>
          <ProjectsProvider>
            <PageTransitionWrapper>
              <Header />
              {props.children}
              <Transition />
            </PageTransitionWrapper>
          </ProjectsProvider>
        </LoaderProvider>
      </body>
    </html>
  )
}
