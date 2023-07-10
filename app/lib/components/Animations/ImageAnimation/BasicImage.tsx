import { RefObject } from 'react';
import Image from 'next/image';

import './style.scss'

interface IProps {
	src: string;
	alt: string;
	width: number;
	height: number;
	imageRef?: RefObject<HTMLImageElement>;
}

export default function BasicImage({ src, alt, width, height, imageRef }: IProps) {
	return <Image ref={imageRef} src={src} alt={alt} width={width} height={height} />
}