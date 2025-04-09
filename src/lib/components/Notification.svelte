<script lang="ts">
import type { NotificationItemType } from '$lib/types/basic/basic';
import Buttons from '$lib/components/Buttons.svelte';

let {
	notification,
	onremove,
}: {
	notification: NotificationItemType;
	onremove?: (id: string) => void;
} = $props();

const { id, title, body, date } = $derived(notification);
const dateObject = $derived(new Date(date));
</script>

<div class="rounded-lg bg-white">
	input
	<p {id}>{title}</p>
	<p>{body}</p>
	<time datetime={dateObject.toISOString()}>
		{dateObject.toLocaleDateString()}
	</time>

	<Buttons
		type="button"
		onclick={() => {
			onremove?.(id);
		}}>remove</Buttons
	>
</div>
