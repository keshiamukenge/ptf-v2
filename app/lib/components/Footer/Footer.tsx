import './style.scss'
import ExternalLink from '@/app/lib/components/Links/ExternalLink'

interface IProps {
	fixedPosition?: boolean
}

export default function Footer({ fixedPosition }: IProps) {
	return (
		<footer className={fixedPosition ? 'fixed' : undefined}>
			<ExternalLink href="mailto:mukenge.keshia@gmail.com" label="Contact" />
			<span className="copyright">all rights reserved - Keshia mukenge © 2023</span>
		</footer>
	)
}