<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { getBrawlerTotalLevelPrice, type GearSlot } from "./util";

type GearType = GearSlot["type"];

interface GearTypesFormatted {
	value: GearType;
	label: string;
}

// eslint-disable-next-line no-use-before-define

const GEAR_TYPES_FORMATTED: GearTypesFormatted[] = [
	{ value: "super_rare", label: "Super Rare Gear (1000 Coins)" },
	{ value: "epic", label: "Epic Gear (1500 Coins)" },
	{ value: "mythic", label: "Mythic Gear (2000 Coins)" },
];

// eslint-disable-next-line no-use-before-define
const INITIAL_VALUES: z.infer<typeof schema> = {
	currentLevel: 1,
	wantedLevel: 11,
	hypercharge: false,
	starPowers: 0,
	gadgets: 0,
	gears: {},
};

const gearTypeEnum = z.enum(["mythic", "epic", "super_rare"]);
const gear = z.object({
	type: gearTypeEnum,
	price: z.union([z.literal(1_000), z.literal(1_500), z.literal(2_000)]),
});

const schema = z.object({
	currentLevel: z.number().min(1).max(11),
	wantedLevel: z.number().min(1).max(11),
	hypercharge: z.boolean().optional(),
	starPowers: z.number().min(0).max(2).optional(),
	gadgets: z.number().min(0).max(2).optional(),
	gears: z
		.object({
			slot1: gear.optional(),
			slot2: gear.optional(),
		})
		.optional(),
});

const form = useForm({
	validationSchema: toTypedSchema(schema),
	initialValues: INITIAL_VALUES,
});

const gadgetsOpened = ref(false);
const starPowersOpened = ref(false);

const gearSlot1Opened = ref(false);
const gearSlot2Opened = ref(false);

const result = ref(getBrawlerTotalLevelPrice(INITIAL_VALUES));

watch(gearSlot1Opened, () => console.log(form.values));

const onSelect = (uncastedValue: string, slot: "slot1" | "slot2") => {
	const value = uncastedValue as GearType;
	form.setFieldValue(`gears.${slot}`, {
		type: value,
		price: value === "super_rare" ? 1_000 : value === "epic" ? 1_500 : 2_000,
	});
};

const onSubmit = form.handleSubmit((values) => {
	console.log(values, form.controlledValues.value);
	result.value = getBrawlerTotalLevelPrice(values);
});
</script>

<template>
	<div>
		<div class="flex flex-col justify-between gap-4 md:flex-row">
			<form class="flex w-full flex-col gap-2 md:w-2/3 lg:w-1/3" @submit="onSubmit">
				<VeeField v-slot="{ componentField }" name="currentLevel">
					<UiFormItem>
						<UiFormLabel>Current Brawler Level</UiFormLabel>
						<UiFormControl>
							<UiInput min="1" max="11" placeholder="1-11" type="number" v-bind="componentField" />
						</UiFormControl>
						<UiFormMessage />
					</UiFormItem>
				</VeeField>
				<VeeField v-slot="{ componentField }" name="wantedLevel">
					<UiFormItem>
						<UiFormLabel>Wanted Brawler Level</UiFormLabel>
						<UiFormControl>
							<UiInput min="1" max="11" placeholder="1-11" type="number" v-bind="componentField" />
						</UiFormControl>
						<UiFormMessage />
					</UiFormItem>
				</VeeField>
				<VeeField v-slot="{ value, handleChange }" name="hypercharge">
					<UiFormItem class="flex flex-row gap-2 space-y-0 rounded-md border p-4">
						<UiFormControl>
							<UiCheckbox :checked="value" @update:checked="handleChange" />
						</UiFormControl>
						<div class="space-y-1 leading-none">
							<UiFormLabel class="-mt-0.5 tracking-normal">Hypercharge</UiFormLabel>
							<UiFormDescription>
								If you will buy the hypercharge, click here to add it to the calculation
							</UiFormDescription>
							<UiFormMessage />
						</div>
					</UiFormItem>
				</VeeField>
				<CalculatorsBrawlerPriceCheckInput
					label="Gadgets"
					description="Amount of gadgets"
					name="gadgets"
					@change="
						gadgetsOpened = $event;
						if (!$event) form.setFieldValue('gadgets', 0);
					"
				>
					<template #input="{ componentField }">
						<UiInput
							v-if="gadgetsOpened"
							v-bind="componentField"
							min="1"
							max="2"
							placeholder="1, or 2"
							type="number"
							class="!mt-2"
						/>
					</template>
				</CalculatorsBrawlerPriceCheckInput>
				<CalculatorsBrawlerPriceCheckInput
					label="Star Powers"
					description="Amount of Star Powers"
					name="starPowers"
					@change="
						starPowersOpened = $event;
						if (!$event) form.setFieldValue('starPowers', 0);
					"
				>
					<template #input="inputProps">
						<UiInput
							v-if="starPowersOpened"
							v-bind="inputProps.componentField"
							min="1"
							max="2"
							placeholder="1, or 2"
							type="number"
							class="!mt-2"
						/>
					</template>
				</CalculatorsBrawlerPriceCheckInput>
				<CalculatorsBrawlerPriceCheckInput
					label="Gear Slot 1"
					description="The price of the gear in the first slot"
					name="gears.slot1"
					@change="
						gearSlot1Opened = $event;
						if (!$event) form.setFieldValue('gears.slot1', undefined);
					"
				>
					<template #input>
						<UiSelect
							v-if="gearSlot1Opened"
							class="!mt-2"
							@update:model-value="(value) => onSelect(value, 'slot1')"
						>
							<UiFormControl>
								<UiSelectTrigger>
									<UiSelectValue placeholder="Select a Gear rarity" />
								</UiSelectTrigger>
							</UiFormControl>
							<UiSelectContent>
								<UiSelectGroup>
									<UiSelectItem
										v-for="gearType in GEAR_TYPES_FORMATTED"
										:key="gearType.value"
										:value="gearType.value"
									>
										{{ gearType.label }}
									</UiSelectItem>
								</UiSelectGroup>
							</UiSelectContent>
						</UiSelect>
					</template>
				</CalculatorsBrawlerPriceCheckInput>
				<CalculatorsBrawlerPriceCheckInput
					label="Gear Slot 2"
					description="The price of the gear in the second slot"
					name="gears.slot2"
					@change="
						gearSlot2Opened = $event;
						if (!$event) form.setFieldValue('gears.slot2', undefined);
					"
				>
					<template #input>
						<UiSelect
							v-if="gearSlot2Opened"
							class="!mt-2"
							@update:model-value="(value) => onSelect(value, 'slot2')"
						>
							<UiFormControl>
								<UiSelectTrigger>
									<UiSelectValue placeholder="Select a Gear rarity" />
								</UiSelectTrigger>
							</UiFormControl>
							<UiSelectContent>
								<UiSelectGroup>
									<UiSelectItem
										v-for="gearType in GEAR_TYPES_FORMATTED"
										:key="gearType.value"
										:value="gearType.value"
									>
										{{ gearType.label }}
									</UiSelectItem>
								</UiSelectGroup>
							</UiSelectContent>
						</UiSelect>
					</template>
				</CalculatorsBrawlerPriceCheckInput>

				<UiButton type="submit" class="mt-1" :disabled="!form.meta.value.valid">Calculate</UiButton>
			</form>

			<div
				class="mt-0 flex max-h-36 w-72 flex-col gap-2 rounded-md border border-border bg-card p-3.5 md:mt-7 lg:mt-5"
			>
				<h1 class="text-2xl font-bold">Result</h1>
				<div class="flex flex-col gap-2">
					<div class="flex justify-between">
						<span class="flex items-center gap-1.5 font-medium">
							<NuxtImg alt="Coins" src="/images/icons/coins.webp" width="24" height="24" fit="inside" />
							Total Coins</span
						>
						<span class="font-semibold">{{ result?.coins }}</span>
					</div>
					<div class="flex justify-between">
						<span class="flex items-center gap-1.5 font-medium">
							<NuxtImg
								alt="Power Points"
								src="/images/icons/powerpoints.webp"
								width="24"
								height="24"
								fit="inside"
							/>
							Total Power Points
						</span>
						<span class="font-semibold">{{ result?.powerpoints }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
