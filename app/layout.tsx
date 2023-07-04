import './globals.scss'
import { Inter } from 'next/font/google'

import '@/app/lib/assets/scss/reset.scss'
import Header from '@/app/lib/components/Header/Header'
import { ProjectsProvider } from '@/app/lib/providers/ProjectsContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProjectsProvider>
          <Header />
          {children}
        </ProjectsProvider>
      </body>
    </html>
  )
}
