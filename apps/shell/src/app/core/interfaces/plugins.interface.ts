export default interface PluginsInterface {
  uniqueName: string;
  name: string;
  componentName?: string;
  remoteName: string;
  remoteFileName?: string;
  remotePort?: number;
  exposedModule?: string;
}
