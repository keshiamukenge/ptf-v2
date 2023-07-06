
import { useProjects } from "@/app/lib/providers/ProjectsContext"
import Plane from "../Plane"
import { getNormalizeHTMLElementPosition, getHTMLElementSize } from '@/app/lib/utils/webgl'

interface IProps {
    refs: React.MutableRefObject<React.MutableRefObject<HTMLLIElement>[]>
}

export default function Gallery({ refs }: IProps) {
    const { selectedProjectId } = useProjects()

    return refs.current?.map((ref, id) => (
        <Plane
            key={id}
            position={getNormalizeHTMLElementPosition(ref.current)}
            args={getHTMLElementSize(ref.current, 100, 100)}
            isSelected={selectedProjectId === id}
        />
    ))
}