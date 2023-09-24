import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbDialogModule, NbThemeModule } from '@nebular/theme';
import { FormularioComponent } from './shared/formulario/formulario.component';
import { HttpClientModule } from '@angular/common/http';
import { ListaUsuariosComponent } from './shared/lista-usuarios/lista-usuarios.component';
import { HomeComponent } from './modules/home/home.component';
import { CadastroComponent } from './modules/cadastro/cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'cadastrar-usuario',
    component: CadastroComponent,
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
