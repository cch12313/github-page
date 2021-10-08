import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'record',
        loadChildren: () => import('./record/record.module').then(m => m.RecordModule)
      },
      {path: '', redirectTo: 'record', pathMatch: 'full'},
      {path: '**', redirectTo: 'record', pathMatch: 'full'}
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
