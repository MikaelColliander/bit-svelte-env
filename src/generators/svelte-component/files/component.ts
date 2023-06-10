import { ComponentContext } from '@teambit/generator';

export const componentFile = (context: ComponentContext) => {
  const { name, namePascalCase: Name } = context;
  return {
    relativePath: `${name}.svelte`,
    content: `<script lang="ts"> 
    import { createEventDispatcher } from 'svelte'; 
    import { writable } from 'svelte/store'; 
    const dispatch = createEventDispatcher(); 
    const store = writable({ hello: "" }); 
  </script> 
  <div class="$name"> {$store.hello} </div> 
  <style> 
    .$name { @apply block } 
  </style>
`,
  };
};

