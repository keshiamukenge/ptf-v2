export interface Work {
	id:      number;
	name:    string;
	date:    Date;
	stack:   string;
	content: Content;
}

export interface Content {
	image:       Image;
	description: string;
}

export interface Image {
	src: string;
	alt: string;
}