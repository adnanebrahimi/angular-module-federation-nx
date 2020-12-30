export default interface PluginsInterface {
  name: string;
  componentName: string;
  remoteName: string;
  remoteFileName?: string;
  remotePort: number;
  exposedModule: string;
}
