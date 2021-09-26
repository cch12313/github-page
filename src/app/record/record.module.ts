import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecordRoutingModule} from './record-routing.module';
import {BaseComponent} from './base/base.component';
import {ShareMaterialsModule} from '../share-materials/share-materials.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import {MarkdownModule} from 'ngx-markdown';


@NgModule({
  declarations: [
    BaseComponent,
    DashboardComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    ShareMaterialsModule,
    RecordRoutingModule,

  ]
})
export class RecordModule {
}
