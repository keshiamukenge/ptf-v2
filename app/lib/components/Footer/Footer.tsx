import './style.scss'
import ExternalLink from '@/app/lib/components/Links/ExternalLink'

interface IProps {
	fixedPosition?: boolean
}

export default function Footer({ fixedPosition }: IProps) {
	return (
		<footer className={fixedPosition ? 'fixed' : undefined}>
			<div className="content-top">
				<ExternalLink href="mailto:mukenge.keshia@gmail.com" label="Contact" />
				<div className="container-links">
					<ExternalLink href="https://www.linkedin.com/in/keshia-m-5a93a2121/" label="Linkedin" />
					<ExternalLink href="https://github.com/keshiamukenge" label="GitHub" />
				</div>
			</div>
			<div className="content-bottom">
				<span className="copyright">Keshia mukenge © 2023</span>
				<span className="copyright">all rights reserved</span>
			</div>
		</footer>
	)
}