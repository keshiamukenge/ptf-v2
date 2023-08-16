'use client'

import { forwardRef } from 'react'

import './style.scss'

interface IProps {
	text: string
	isVisible?: boolean
}

const BasicText = forwardRef<HTMLSpanElement, IProps>(function TextComponent(props, ref) {
	const { text, isVisible } = props
	return <span ref={ref} className={`paragraph-animation ${isVisible ? "visible" : null}`}>{text}</span>
})

export default BasicText