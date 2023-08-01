'use client'

import { useEffect, useState } from 'react'

import './style.scss'
import ItemsList from '@/app/lib/components/ItemsList/ItemsList'
import TitleAnimation from '@/app/lib/components/Animations/TextAnimations/TitleAnimation'
import { getWorksServices } from '@/app/lib/services/projects'
import { Work } from '@/app/lib/types/works'

export default function Works() {
	const [works, setWorks] = useState<Work[]>([])

	async function getWorks() {
		try {
			const result = await getWorksServices()

			setWorks(result)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getWorks()

		setTimeout(() => {
			console.log(works)
		}, 3000)
	}, [])

	return(
		<main className="works-page">
			<h1>
				<TitleAnimation text="Works" />
			</h1>
			<ItemsList items={works} />
		</main>
	)
}