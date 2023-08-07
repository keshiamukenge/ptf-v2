import './style.scss'
import LinkWithDelay from '@/app/lib/components/Links/LinkWithDelay'
import LinkIsActive from '@/app/lib/components/Links/LinkIsActive'

export default function Header() {
	return(
		<header>
			<LinkWithDelay additionalClassName="home-link" href="/" delayBeforeLeave={400} delayToStart={0}>Keshia Mukenge</LinkWithDelay>
			<span className="job">Web Developer - Front-end</span>
			<LinkIsActive additionalClassName="selected-works-link" path="/">
				<LinkWithDelay href="/" delayBeforeLeave={400} delayToStart={0}>
					Selected Works
				</LinkWithDelay>
			</LinkIsActive>
			<LinkIsActive additionalClassName="works-link" path="/works">
				<LinkWithDelay href="/works" delayBeforeLeave={400} delayToStart={0}>
					Works
				</LinkWithDelay>
			</LinkIsActive>
			<LinkIsActive additionalClassName="about-link" path="/about">
				<LinkWithDelay href="/about" delayBeforeLeave={400} delayToStart={0}>
					About
				</LinkWithDelay>
			</LinkIsActive>
		</header>
	)
}