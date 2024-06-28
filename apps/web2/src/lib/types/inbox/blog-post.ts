export interface ScrapedBlogPostData {
	props: Props;
	page: string;
	buildId: string;
	isFallback: boolean;
	gsp: boolean;
}

export interface Props {
	pageProps: PageProps;
	__N_SSG: boolean;
}

export interface PageProps {
	gameName: string;
	hero: string;
	publishDate: string;
	title: string;
	openGraph: OpenGraph;
	bodyCollection: BodyCollection[];
	moreNewsButton: MoreNewsButton;
	locale: string;
}

export interface OpenGraph {
	title: string;
	description: string;
	image: string;
	siteName: string;
}

export interface BodyCollection {
	__typename: string;
	title: string;
	text: Text;
}

export interface MoreNewsButton {
	linkUrl: string;
	text: string;
}
