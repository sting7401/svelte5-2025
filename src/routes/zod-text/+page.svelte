<script lang="ts">
import type { PageData } from './$types';

let { data }: { data: PageData } = $props();

console.log(data);
</script>

{data?.result?.name}
