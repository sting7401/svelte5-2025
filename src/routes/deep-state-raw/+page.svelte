<script lang="ts">
import { generateNotifications } from '$lib/utils/generate-notification';
import Notification from '$lib/components/Notification.svelte';
import Buttons from '$lib/components/Buttons.svelte';

let notifications = $state(generateNotifications(3));
</script>

<Buttons
	type="button"
	onclick={() => {
		notifications = generateNotifications(3);
	}}>refresh</Buttons
>
<ul class="space-y-5 divide-y divide-emerald-50">
	{#each notifications as notification, index (notification.id)}
		<li data-index={index}>
			<Notification
				{notification}
				onremove={id => {
					// notifications.splice(index, 1);

					notifications = notifications.filter(n => n.id !== id);
				}}
			/>
		</li>
	{:else}
		<p>none</p>
	{/each}
</ul>
