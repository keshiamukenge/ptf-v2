export interface Projects {
	projects: Project[];
}

export interface Project {
	id:    number;
	title: string;
	slug:  string;
	siteUrl: string;
	image: ProjectImage;
	details: ProjectDetail[];
	sources: ProjectSources;
	textsContent: string[];
	imagesContent: ProjectImage[];
}

export interface ProjectImage {
	src: string;
	alt: string;
}

export interface ProjectDetail {
	label: string;
	content: string[];
}

export interface ProjectSources {
	label: string;
	links: SourceLink[];
}

export interface SourceLink {
	label: string;
	url: string;
}