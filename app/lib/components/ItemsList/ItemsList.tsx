import './style.scss'
import { Work } from '@/app/lib/types/works'

interface IProps {
	items: {
		id: number,
		name: string,
		date: string,
		stack: string,
		content: React.ReactNode,
	}[]
}

export default function ItemsList({ items }: IProps) {
	return(
		<ul className="items-list">
			{items.map(item => (
				<li key={item.id}>
					<div className="item-header"></div>
					<div className="item-content">
						{item.content}
					</div>
				</li>
			))}
		</ul>
	)
}