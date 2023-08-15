import './style.scss'
import Item from './Item'
import { Archive } from '@/app/lib/types/archive'

interface IProps {
	items: Archive[]
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