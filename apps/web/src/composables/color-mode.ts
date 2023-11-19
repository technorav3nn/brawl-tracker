/* eslint-disable unicorn/template-indent */
import dedent from "dedent";
import type { WatchSource } from "vue";

/**
 * Disables CSS transitions when `source` changes.
 *
 * @param source - The Vue source to watch
 */
export function useDisableCssTransitions<T>(source: WatchSource<T>) {
	onMounted(() =>
		watch(source, () => {
			const css = document.createElement("style");
			css.dataset.info = "disable-css-transitions";

			const node = document.createTextNode(dedent`* {
			-webkit-transition: none !important;
			-moz-transition: none !important;
			-o-transition: none !important;
			-ms-transition: none !important;
			transition: none !important;
		 }`);

			css.append(node);
			// eslint-disable-next-line unicorn/prefer-dom-node-append
			document.head.appendChild(css);

			// @ts-expect-error - unused variable
			// eslint-disable-next-line no-unused-vars
			const _ = window.getComputedStyle(css).opacity;
			css.remove();
		})
	);
}
