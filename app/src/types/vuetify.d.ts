// vuetify.d.ts
import 'vue';
import { VuetifyInstance } from 'vuetify';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $vuetify: VuetifyInstance;
  }
}
