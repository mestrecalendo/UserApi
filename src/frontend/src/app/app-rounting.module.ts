import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbDatepickerModule, NbDialogModule, NbThemeModule, NbToastrModule } from '@nebular/theme';
import { FormularioComponent } from './shared/formulario/formulario.component';
import { HttpClientModule } from '@angular/common/http';
import { ListaUsuariosComponent } from './shared/lista-usuarios/lista-usuarios.component';
import { HomeComponent } from './modules/home/home.component';
import { CadastroComponent } from './modules/cadastro/cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbDialogModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbToastrModule.forRoot(),
  ],
  exports:[
    RouterModule
  ]
})

export class AppRoutingModule{}
