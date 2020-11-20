import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ClienteComponent } from './pages/cliente/cliente.component';

const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'cliente/:id', component: ClienteComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'clientes' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
