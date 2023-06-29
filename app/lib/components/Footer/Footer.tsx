import Link from 'next/link'
import './style.scss'

interface IProps {
	fixedPosition?: boolean
}

export default function Footer({ fixedPosition }: IProps) {
	return (
		<footer className={fixedPosition ? 'fixed' : undefined}>
			<a href="mailto:mukenge.keshia@gmail.com">contact</a>
			<span className="copyright">all rights reserved - Keshia mukenge © 2023</span>
		</footer>
	)
}