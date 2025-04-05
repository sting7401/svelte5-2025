<script lang="ts">
	import Counter from '$lib/components/Counter.svelte';
	import Buttons from '$lib/components/Buttons.svelte';
	import { AlarmClock, Search } from 'lucide-svelte';
	let html = '<p>test</p>';

	let button: Buttons;

	$effect(() => {
		console.log(button.getButton());
		//button.focus();
		button.getButton().focus();
	});
</script>

<Counter />

{#snippet left()}
	<Search />
{/snippet}

<Buttons bgColor="green" textColor="red" rounded="--20" href="https://naver.com">자식요소에</Buttons
>
<Buttons {left} size="py-15" shadow={false} data-button-event="전파">자식요소에 전파</Buttons>

{@html html}
<Buttons
	bind:this={button}
	size="py-10"
	shadow
	onclick={(e: Event) => {
		e.preventDefault();
		e.stopPropagation();
		alert();
	}}
	onLeftHover={() => {
		console.log('hover');
	}}
>
	{#snippet left(isLeftHovered: boolean)}
		{#if isLeftHovered}
			<Search />
		{:else}
			<AlarmClock />
		{/if}
	{/snippet}
	{#snippet children(isLeftHovered)}
		자식요소에 전파 {isLeftHovered}
	{/snippet}

	{#snippet right()}
		<AlarmClock />
	{/snippet}</Buttons
>
