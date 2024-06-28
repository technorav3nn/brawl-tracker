export interface ScrapedBlogListData {
	props: Props;
	page: string;
	query: Query;
	buildId: string;
	isFallback: boolean;
	gsp: boolean;
	scriptLoader: ScriptLoader[];
}

export interface Props {
	pageProps: PageProps;
	__N_SSG: boolean;
}

export interface PageProps {
	archiveHeader: string;
	paginationBaseUrl: string;
	pageTitle: string;
	currentPage: number;
	pageNumbers: number[];
	articles: Article[];
	dropDownOptions: DropDownOptions;
}

export interface Article {
	descriptionForNewsArchive: any;
	category: string;
	showCategoryInTitle: boolean;
	thumbnail: Thumbnail;
	title: string;
	linkUrl: string;
	publishDate: string;
	isSmallNews: boolean;
	locale: string;
}

export interface Thumbnail {
	imgUrl: string;
	width: number;
	height: number;
}

export interface DropDownOptions {
	current: string;
	linkItems: LinkItem[];
}

export interface LinkItem {
	name: string;
	url: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Query {}

export interface ScriptLoader {
	id: string;
	strategy: string;
	type: string;
	children: string;
}
