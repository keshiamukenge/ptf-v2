export interface Projects {
	projects: Project[];
}

export interface Project {
	id:    number;
	title: string;
	image: Image;
}

export interface Image {
	src: string;
	alt: string;
}