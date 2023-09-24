import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbDialogModule, NbThemeModule } from '@nebular/theme';
import { FormularioComponent } from './modules/formulario/formulario.component';
import { HttpClientModule } from '@angular/common/http';
import { ListaUsuariosComponent } from './modules/lista-usuarios/lista-usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: ListaUsuariosComponent,
  },
  {
    path: 'login',
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
