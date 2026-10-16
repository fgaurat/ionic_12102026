import { registerPlugin } from '@capacitor/core';

import type { HelloPluginPlugin } from './definitions';

const HelloPlugin = registerPlugin<HelloPluginPlugin>('HelloPlugin', {
  web: () => import('./web').then((m) => new m.HelloPluginWeb()),
});

export * from './definitions';
export { HelloPlugin };
