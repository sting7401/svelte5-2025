<script lang="ts">
</script>

{#snippet bold(x: number | string)}
	<strong>{x}</strong>
{/snippet}

{#snippet sum(a: number, b: number)}
	<span>
		{a} + {b} = {@render bold(a + b)}
	</span>
{/snippet}

<button type="button" class="rounded-sm bg-red-600 p-5 text-white">text</button>

{@render sum(2, 2)}
{@render bold('strong')}
