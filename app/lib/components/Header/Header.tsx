import Link from 'next/link'
import './style.scss'

export default function Header() {
	return(
		<header>
			<Link className="home-link" href="/">Keshia Mukenge</Link>
			<span className="job">Web Developer - Front End</span>
			<Link className="works-link" href="/">Works</Link>
			<Link className="about-link" href="/about">About</Link>
		</header>
	)
}