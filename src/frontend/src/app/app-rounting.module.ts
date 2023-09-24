import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbDialogModule, NbThemeModule } from '@nebular/theme';
import { FormularioComponent } from './modules/formulario/formulario.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: FormularioComponent,
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forRoot(routes),
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbDialogModule.forRoot(),
  ],
  exports:[
    RouterModule
  ]
})

export class AppRoutingModule{}
