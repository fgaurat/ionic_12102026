export interface HelloPluginPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
