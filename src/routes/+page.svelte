<script lang="ts">
	const navList = ['기본'];
</script>

<nav>
	{#each navList as link (link)}
		<a href="./{link}/">{link}</a>
	{/each}
</nav>
