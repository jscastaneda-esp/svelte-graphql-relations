import preprocess from 'svelte-preprocess';
/** @type {import('@sveltejs/kit').Config} */
import node from '@sveltejs/adapter-node';

const config = {
	kit: {
		adapter: node(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	},

	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
