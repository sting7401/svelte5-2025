<script lang="ts">
	import '../app.css';

	let { children } = $props();
	const navList: string[] = ['/', '기본', '기본 예제'];
</script>

<nav class="space-x-5 p-2">
	{#each navList as link, index (link)}
		<a href={index === 0 ? '/' : link} data-index={index}>{link}</a>
	{/each}
</nav>

<main class="p-2">{@render children()}</main>
