import { PageTransitionsProvider } from '@/app/lib/providers/PageTransitionsContext'

interface IProps {
	children: React.ReactNode
}

export default function PageTransitionWrapper({ children }: IProps) {
	return(
		<PageTransitionsProvider>
			<div>
				{children}
			</div>
		</PageTransitionsProvider>
	)
}