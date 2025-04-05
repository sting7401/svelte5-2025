import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess({
		script: true // 👈 this is important
	}),
	kit: { adapter: adapter() }
};

export default config;
