import './style.scss'
import InternalLink from '@/app/lib/components/Links/InternalLink'
import Footer from '@/app/lib/components/Footer/Footer'

export default function NotFound() {
	return(
		<main className="not-found-page">
			<h1>404</h1>
			<div className="container-internal-link">
				<InternalLink label="Go back to home" href="/" />
			</div>
			<Footer fixedPosition />
		</main>
	)
}