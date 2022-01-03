# Svelte Debouncer

Installation:
```
npm install svelte-debouncer
```

## Usage:
```svelte
<script lang="ts">
	
	import Debouncer from './module';

	let search_string: string;

	function search(query: string) {
		alert(`Searching for ${query}`);
	}

	const search_debouncer = new Debouncer(search, 500);

	$: search_debouncer.debounce(search_string);

</script>

<main>
	<input placeholder="Search" bind:value={search_string} >
</main>
```
(TypeScript is not required)

## Arguments:
### new(callback: (...args: any[]), delay: number, debounce_first: boolean = false): Debouncer<T>
- `callback`: The function to call when the debounce time has elapsed.
- `delay`: The time to wait before calling the callback (in milliseconds).
- `debounce_first`: Whether to start the timer immediately after the first call. (should be false when using with svelte, since it will be called immediately and not only on change, should be true otherwise)

### Debouncer.debounce(...args: any[]): any
- `...args`: The arguments to pass to the callback.

## Usage without Svelte:
Despite it's name, this module can be used without Svelte.

You'll just need to pass `true` as the third argument of the constructor (`debounce_first`) and then call the `debounce` method on the input event of the field you want to debounce.
	
### Vue:
```vue
<template>
	<input placeholder="Search" @input="search_debouncer.debounce($event.target.value)">
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Debouncer from 'svelte-debouncer';

export default defineComponent({
  data() {
    return {
      search_debouncer: new Debouncer(this.search, 1000, true),
    }
  },
  methods: {
    search(query: string) {
      alert(`Searching for ${query}`);
    }  
  }
});
</script>
```

### React:
(Although there's probably better ways to do this in React)
```tsx
import Debouncer from "svelte-debouncer";

function App() {

  function search(query: string) {
    alert(`Searching for ${query}`);
  }

  const search_debouncer = new Debouncer(search, 1000, true);

  return (
    <input placeholder="Search" onChange={(e) => search_debouncer.debounce(e.target.value)}/>
  );
}

export default App;
```
