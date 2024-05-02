declare module '*.svg' {
  import type { DefineComponent } from 'vue';
  const content: DefineComponent<{}, {}, any>;
  export default content;
}
