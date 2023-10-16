// import type { InferRecipeSlots } from "$lib/types/slot-recipes";
// import { styled } from "$styled-system/jsx";
// import { type CardVariantProps, card } from "$styled-system/recipes";

// const CONTEXT_NAME = Symbol("card symbol");

// function getCardRecipeContext() {
// 	return inject<InferRecipeSlots<typeof card>>(CONTEXT_NAME)!;
// }

// function setCardRecipeContext(props: CardVariantProps) {
// 	return provide(CONTEXT_NAME, card(props));
// }

// const CardRoot = (props: CardVariantProps) => {
// 	setCardRecipeContext(props);
// 	const slots = useSlots();
// 	const classes = getCardRecipeContext();
// 	return <div class={classes.root}>{slots.default?.()}</div>;
// };

// export const Card = Object.assign(CardRoot, {
// 	Root: CardRoot,
// });
