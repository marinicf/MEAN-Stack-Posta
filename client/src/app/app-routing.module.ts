import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { PostaDetailComponent } from './components/posta-detail/posta-detail.component';
import { PostaListComponent } from './components/posta-list/posta-list.component';
import { PostaStartComponent } from './components/posta-start/posta-start.component';
import { PostaComponent } from './components/posta/posta.component';

//registriranje ruta.... bez (/) za path
//polje JS objekta gdje svaki objekt reprezentira jednu rutu
const routes: Routes = [
  { path: '', redirectTo: 'posta', pathMatch:'full'},
  { path: 'posta', component: PostaComponent, children:[
    { path: '', component: PostaStartComponent},
    { path: ':id', component: PostaDetailComponent}
  ]},
  { path: 'map', component: MapComponent, canActivate: [AuthGuard]},
  { path: 'auth', component: AuthComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
