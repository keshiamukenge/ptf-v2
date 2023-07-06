import './style.scss'

interface IProps {
	params: {
		slug: string
	}
}

export default function ProjectPage({ params }: IProps) {
	return (
		<main className="project-page">
			<h1>Project : {params.slug}</h1>
		</main>
	)
}