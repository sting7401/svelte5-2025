<script lang="ts">
import type { PageProps } from './$types';

import Sheet from '$lib/components/sheet/Sheet.svelte';

let { data }: PageProps = $props();

const { title } = data;

let lists = $state([
	[
		{ value: 'Item', bgColor: '#6aa84f', color: '#fff' },
		{ value: 'Price', bgColor: '#6aa84f', color: '#fff' },
		{ value: 'Quantity', bgColor: '#6aa84f', color: '#fff' },
		{ value: 'Total', bgColor: '#51803d', color: '#fff' },
	],
	[{ value: 'Milk' }, { value: '3' }, { value: '2' }, { value: '=MULTIPLY(B2,C2)' }],
	[{ value: 'Oats' }, { value: '4' }, { value: '1' }, { value: '=MULTIPLY(B3,C3)' }],
	[{ value: 'Honey' }, { value: '5' }, { value: '2' }, { value: '=MULTIPLY(B4,C4)' }],
	[{ value: 'Strawberries' }, { value: '2' }, { value: '2' }, { value: '=MULTIPLY(B5,C5)' }],
	[
		{ value: '', bgColor: '#b4a7d6' },
		{ value: '', bgColor: '#b4a7d6' },
		{ value: 'Total', bgColor: '#b4a7d6' },
		{ value: '=SUM(D2,D3,D4,D5)', bgColor: '#8e7eb6' },
	],
]);
let listNew = $state([[]]);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

<Sheet bind:lists />

<pre>
	{JSON.stringify(lists, null, 2)}
</pre>

<style>
:global {
	body {
		background-color: #2222;
		color: #222;
	}
}
</style>
