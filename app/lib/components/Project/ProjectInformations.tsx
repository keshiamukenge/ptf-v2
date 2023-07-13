import './style.scss'
import { Project } from '@/app/lib/types/projects'
import TextAnimation from '@/app/lib/components/Animations/TextAnimations/TextAnimation'
import ExternalLink from '@/app/lib/components/ExternalLink/ExternalLink'

interface IProps {
	project: Project
}

export default function ProjectInformations({ project }: IProps) {
	return(
		<div className="project-informations">
			{project.details && project.details.map(detail => (
				<div key={detail.label} className="container-infos">
					<span className="infos-label">
						<TextAnimation text={detail.label} />
					</span>
					{detail.content.map(content => (
						<span key={content} className="infos-content">
							<TextAnimation text={content} />
						</span>
					))}
				</div>
			))}
			{project.sources && (
				<div className="container-infos">
					<span className="infos-label">
						<TextAnimation text={project.sources.label} />
					</span>
					{project.sources.links.map(source => (
						<a key={source.label} href={source.url} target="_blank" rel="noreferrer">
							<span className="infos-content">
								<TextAnimation
									text={
										<ExternalLink href={source.url} label={source.label} />
									}
								/>
							</span>
						</a>
					))}
				</div>
			)}
		</div>
	)
}