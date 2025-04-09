import type { PageLoad } from './$types';

export const load: PageLoad = (async () => {
	return { title: 'cell value' };
}) satisfies PageLoad;
