import Header from "@/app/lib/components/Header/Header"

interface IProps {
	children: React.ReactNode
}

export default function AboutLayout({ children }: IProps) {
	return (
		<>
			<Header />
			{children}
		</>
	)
}