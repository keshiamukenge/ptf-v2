import "./style.scss"
import { ProjectImage } from "@/app/lib/types/projects"
import ImageAnimation from "@/app/lib/components/Animations/ImageAnimation/ImageAnimation"

interface IProps {
	images: ProjectImage[]
}

export default function ProjectImages({ images }: IProps) {
	return(
		<ul className="project-images">
			{images.map((image, id) => (
				<li key={id}>
					<ImageAnimation
						key={image.src}
						src={image.src}
						alt={image.alt}
						width={1200}
						height={600}
					/>
				</li>
			))}
		</ul>
	)
}