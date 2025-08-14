export interface ApiResponse<T> {
	ok: boolean;
	credit: string;
	result?: T;
}
