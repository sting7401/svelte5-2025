<script lang="ts">
	const CounterState = {
		INIT: 0,
		ING: 1
	} as const;
	type CounterStateType = (typeof CounterState)[keyof typeof CounterState];

	let count: number = $state(0);
	let frequency: number = $state(1000);
	let ing = $state<CounterStateType>(CounterState.INIT);

	$effect(() => {
		let interval: ReturnType<typeof setInterval>;
		if (ing === CounterState.ING) return;

		interval = setInterval(() => {
			count += 1;
		}, frequency);

		return () => {
			console.log('초기화');
			clearInterval(interval);
		};
	});
</script>

<button
	type="button"
	role="button"
	onclick={() => {
		ing = CounterState.INIT;
		count = 0;
		const _origin = frequency;
		frequency = 0;
		frequency = _origin;
	}}
>
	{count}
</button>
<button
	type="button"
	onclick={() => {
		ing = ing === CounterState.INIT ? CounterState.ING : CounterState.INIT;
	}}>{ing === CounterState.INIT ? '멈춤' : '실행'}</button
>
<button
	type="button"
	class="bg-blue-600 p-2 text-white"
	onclick={() => {
		ing = CounterState.ING;
		frequency *= 2;
	}}>속도 줄이기</button
>
<button
	type="button"
	class="bg-blue-600 p-2 text-white"
	onclick={() => {
		ing = CounterState.ING;
		frequency /= 2;
	}}>속도 올리기</button
>
