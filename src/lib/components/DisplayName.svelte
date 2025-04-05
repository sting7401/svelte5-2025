<script lang="ts">
	let name: string = '이름';
	let src: string = 'https://picsum.photos/250/300';
	let 이미지이름: string = '산';
	let bio: string = '<strong>html 태그그</strong>';
	let username: string = $state('');
	let lastName: string = $state('');
	let fullname: string = $derived.by(() => {
		console.log('derived.by 실행');
		return `${lastName} ${username}`;
	});

	$effect(() => {
		if (username || lastName) {
			console.log('이펙트 실행');
		}
	});
</script>

<h1 class="text-red-600">{name} hello</h1>

{#await src}
	로딩
{:then src}
	<img {src} alt="이미지 이름은 {이미지이름}" />
{/await}

<p>{@html bio}</p>

<!-- <input type="text" value={username} oninput={(e) => (username = e.currentTarget.value)} /> -->
<input
	type="text"
	bind:value={username}
	oninput={(e) => {
		username = e.currentTarget.value;
		console.log(username);
	}}
/>
<input type="text" bind:value={lastName} />
<input type="text" bind:value={fullname} />
<h2>{username} {lastName} : {fullname}</h2>

<button
	onclick={() => {
		console.log(fullname);
	}}>Button</button
>
