/**
 * Returns true if the current page is the same as the path or if the current page starts with the path.
 *
 * @param currentPage - The current page
 * @param path - The path to check, e.g. "/about"
 * @returns True if the current page is the same as the path or if the current page starts with the path
 */
export function shouldSetAriaCurrentPage(currentPage: string, path: string) {
	return path === "/" ? currentPage === path : currentPage.startsWith(path);
}
