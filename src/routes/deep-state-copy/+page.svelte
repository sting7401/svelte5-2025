<script lang="ts">
let array = $state<number[]>([1, 2, 3, 4]);
let objectArray = $state([{ id: 1 }, { id: 2 }]);
let object = $state({
	firstName: 'ali',
	lastName: 'khan',
	address: {
		city: 'city',
		street: 'street',
	},
});

// $inspect(object).with(console.trace);

// $effect(() => {
// 	$inspect.trace();
// 	console.log(object?.firstName);
// 	console.log(object?.address.city);
// });
</script>

<!-- {@debug object, array} -->
<p>{object?.firstName}</p>
<p>{object?.address?.city}</p>
<p>{object?.address?.street}</p>

<input type="text" name="" id="" bind:value={object.firstName} />
<input type="text" name="" id="" bind:value={object.address.city} />
<input type="text" name="" id="" bind:value={object.address.street} />

<p>{array}</p>

<button
	onclick={() => {
		object.firstName = '새이름';
		//array.push(Math.random() * 10)
		array = [...array, Math.floor(Math.random() * 10)];
	}}>랜덤 {array.length - 1}</button
>

<button
	onclick={() => {
		console.log($state.snapshot(object));
	}}>log snapshot</button
>
