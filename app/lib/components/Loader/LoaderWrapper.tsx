import Loader from '@/app/lib/components/Loader/Loader'
import { useLoader } from '@/app/lib/providers/LoaderContext'

interface IProps {
	children: React.ReactNode
	imagesUrls: string[]
}

export default function LoaderWrapper({ children, imagesUrls }: IProps) {
	const { isLoading } = useLoader()

	return(
		<>
			{isLoading && <Loader imagesUrls={imagesUrls} />}
			{children}
		</>
	)
}