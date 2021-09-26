import {NgModule, SecurityContext} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecordRoutingModule} from './record-routing.module';
import {BaseComponent} from './base/base.component';
import {ShareMaterialsModule} from '../share-materials/share-materials.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DetailComponent} from './detail/detail.component';
import {MarkdownModule} from 'ngx-markdown';
import {HttpClient, HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    BaseComponent,
    DashboardComponent,
    DetailComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ShareMaterialsModule,
    RecordRoutingModule,
    MarkdownModule.forRoot(
      {loader: HttpClient, sanitize: SecurityContext.NONE}
      )
  ]
})
export class RecordModule {
}
