import Image from 'next/image'

import './style.scss'
import LinkWithDelay from '@/app/lib/components/PageTransition/LinkWithDelay'
import Footer from "@/app/lib/components/Footer/Footer"

export default function About() {
	return (
		<main className="about-page">
			<div className="main-container">
				<div className="container-image">
					<LinkWithDelay href="/">
						<Image src="/images/about.png" alt="Keshia mukenge's picture" width={200} height={200} />
					</LinkWithDelay>
				</div>
				<div className="container-text">
					<h1>About</h1>
					<p>Lorem ipsum dolor sit amet consectetur. Duis nec semper velit sapien sollicitudin habitasse faucibus. Tempus congue sed ornare commodo justo netus. Magna pretium nec vitae interdum. Vulputate integer tincidunt malesuada nunc mauris tortor enim odio.</p>
				</div>
			</div>
			<Footer fixedPosition />
		</main>
	)
}