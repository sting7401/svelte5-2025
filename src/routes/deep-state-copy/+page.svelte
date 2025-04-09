<script lang="ts">
import { z } from 'zod';
let array = $state<number[]>([1, 2, 3, 4]);
let objectArray = $state([{ id: 1 }, { id: 2 }]);

// Zod 스키마 정의
const objSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	address: z.object({
		city: z.string().min(1),
		street: z.string().min(1),
	}),
});
// 스키마에서 타입 추출
type ObjSchema = z.infer<typeof objSchema>;

let object: ObjSchema = $state({
	firstName: 'ali',
	lastName: 'khan',
	address: {
		city: 'city',
		street: 'street',
	},
});

try {
	objSchema.parse(object); // 유효성 검사
	console.log('Object is valid');
} catch (error) {
	console.error('Validation error:', error);
}

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

<p>{objectArray}</p>

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
