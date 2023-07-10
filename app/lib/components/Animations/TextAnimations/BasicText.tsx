import './style.scss'

interface IProps {
	text: string
	target: string
}

export default function BasicText({ text, target }: IProps) {
	return <span className={`paragraph-animation ${target}`}>{text}</span>
}