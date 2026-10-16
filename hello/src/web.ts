import { WebPlugin } from '@capacitor/core';

import type { HelloPluginPlugin } from './definitions';

export class HelloPluginWeb extends WebPlugin implements HelloPluginPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
