import type { ComputedGetter } from "vue";

export function useCachedComputed<T>(sourceFn: ComputedGetter<T>, cacheDuration = 1000): ComputedRef<T> {
	const cachedValue = ref(sourceFn());
	let timer: number | null = null;

	watch(
		sourceFn,
		(newValue) => {
			if (timer) return; // Don't update if we're in the cooldown
			cachedValue.value = newValue;
			timer = setTimeout(() => {
				timer = null;
			}, cacheDuration) as unknown as number;
		},
		{ immediate: true }
	);

	return computed(() => cachedValue.value);
}
