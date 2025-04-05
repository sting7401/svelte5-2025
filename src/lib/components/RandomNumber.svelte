<script lang="ts">
	import { untrack, tick, onMount, onDestroy } from 'svelte';

	let randomValue: number = $state(Math.floor(Math.random() * 10));
	let randomDoubled: number = $derived(randomValue * 2);
	let history: number[] = $state([untrack(() => randomValue)]);
	let historyTag: HTMLParagraphElement;

	// $effect(() => {
	// 	// 계속 시행 됨을 방지 하려면
	// 	randomValue;
	// 	untrack(() => {
	// 		history.push(randomValue);
	// 	});
	// });

	const updateRandomValue = () => {
		randomValue = Math.floor(Math.random() * 20);
		history = [...history, randomValue];
	};

	onMount(() => {
		console.log('mount');

		return () => {
			console.log('un mount');
		};
	});

	onDestroy(() => {
		console.log('onDestroy');

		return () => {
			console.log('un onDestroy');
		};
	});

	$effect.pre(() => {
		history.length;
		console.log(`${history?.length} pre : ${historyTag?.innerText}`);
		tick().then(() => {
			console.log(`${history?.length} tick : ${historyTag?.innerText}`);
		});

		// try {
		// 	tick();
		// 	console.log(`${history?.length} tick : ${historyTag?.innerText}`);
		// } catch (err) {
		// 	console.error(err);
		// }

		return () => {
			console.log('pre clean');
		};
	});

	$effect(() => {
		history.length;
		console.log(`${history?.length} : ${historyTag?.innerText}`);

		return () => {
			console.log('clean');
		};
	});
</script>

{randomValue}
{randomDoubled}

<p bind:this={historyTag}>: {history}</p>

<button type="button" aria-label="랜덤 버튼" onclick={updateRandomValue}>랜덤</button>
