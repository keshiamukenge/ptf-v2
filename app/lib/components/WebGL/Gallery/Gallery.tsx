import Plane from "../Plane"
import { getNormalizeHTMLElementPosition, getHTMLElementSize } from '@/app/lib/utils/webgl'

interface IProps {
    refs: React.MutableRefObject<React.MutableRefObject<HTMLLIElement>[]>
}

export default function Gallery({ refs }: IProps) {
    return refs.current?.map((ref, id) => (
        <Plane
            key={id}
            position={getNormalizeHTMLElementPosition(ref.current)}
            args={getHTMLElementSize(ref.current, 100, 100)}
        />
    ))
}