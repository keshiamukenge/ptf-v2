import Link from 'next/link'
import './style.scss'
import LinkWithDelay from '@/app/lib/components/PageTransition/LinkWithDelay'

export default function Header() {
	return(
		<header>
			<LinkWithDelay href="/" delayBeforeLeave={1500} delayToStart={500}>Keshia Mukenge</LinkWithDelay>
			<span className="job">Web Developer - Front End</span>
			<LinkWithDelay additionalClassName="works-link" href="/" delayBeforeLeave={1500} delayToStart={500}>Works</LinkWithDelay>
			<LinkWithDelay additionalClassName="about-link" href="/about" delayBeforeLeave={1500} delayToStart={500}>About</LinkWithDelay>
		</header>
	)
}