<script setup lang="ts">
import { Tabs, TabContent, TabsList, TabsTrigger } from "$components/ui/tabs";
import { css } from "$styled-system/css";
import { Box } from "$styled-system/jsx";

const tabs = [{ name: "All" }, { name: "Friends" }, { name: "Guild" }];
const selected = ref("All");
</script>

<template>
	<div>
		<h1>Leaderboard</h1>
		<Tabs v-model="selected" variant="line" :class="css({ mt: '5' })">
			<TabsList>
				<TabsTrigger v-for="tab in tabs" :key="tab.name" :value="tab.name"> {{ tab.name }} </TabsTrigger>
			</TabsList>
			<TabContent v-for="tab in tabs" :key="tab.name" :value="tab.name">
				<Box p="4"> {{ tab.name }} </Box>
			</TabContent>
		</Tabs>
	</div>
</template>
