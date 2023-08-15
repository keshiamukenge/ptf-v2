export interface Archive {
	id: number;
	name: string;
	date: string;
	stack: string;
	content: Content;
}

export interface Content {
	image: Image;
	description: string;
	link: string;
}

export interface Image {
	src: string;
	alt: string;
}