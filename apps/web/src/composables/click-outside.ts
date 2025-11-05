import { onBeforeUnmount, onMounted } from "vue";

export type ClickEvents = "click" | "contextmenu" | "mousedown" | "mouseup" | "touchend" | "touchstart";

export function useDetectClickOutside(component: any, event: ClickEvents, callback: () => any | undefined) {
	if (!component) return;
	const listener = (event: any) => {
		if (event.target !== component.value && event.composedPath().includes(component.value)) {
			return;
		}

		if (typeof callback === "function") {
			callback();
		}
	};

	onMounted(() => {
		window.addEventListener(event, listener);
	});

	onBeforeUnmount(() => {
		window.removeEventListener(event, listener);
	});

	return { listener };
}
