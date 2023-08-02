import './style.scss'
import Item from './Item'
import { Work } from '@/app/lib/types/works'

interface IProps {
	items: Work[]
}

export default function ItemsList({ items }: IProps) {
	return(
		<ul className="items-list">
			{items.map(item => (
				<Item item={item} key={item.id} />
			))}
		</ul>
	)
}