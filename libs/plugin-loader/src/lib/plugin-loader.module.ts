import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginComponent } from './components/plugin/plugin.component';

@NgModule({
  declarations: [PluginComponent],
  imports: [CommonModule],
  exports: [PluginComponent]
})
export class PluginLoaderModule {}
