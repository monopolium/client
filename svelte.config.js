import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

// https://svelte.dev/docs#compile-time-svelte-preprocess
export default {
  preprocess: vitePreprocess(),
};
