import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbThemeModule } from '@nebular/theme';
import { FormularioComponent } from './modules/formulario/formulario.component';

const routes: Routes = [
  {
    path: '',
    component: FormularioComponent,
  }
];

@NgModule({
  imports:[
    RouterModule.forRoot(routes),
    NbThemeModule.forRoot({ name: 'default' }),
    
  ],
  exports:[
    RouterModule
  ]
})

export class AppRoutingModule{}
