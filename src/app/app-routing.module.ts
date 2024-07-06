import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { BodyComponent } from './body/body.component';
import { CVComponent } from './cv/cv.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { BuscarOfertasComponent } from './buscar-ofertas/buscar-ofertas.component';
import { PostulacionesComponent } from './postulaciones/postulaciones.component';
import { VisitasPerfilComponent } from './visitas-perfil/visitas-perfil.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { SalariosComponent } from './salarios/salarios.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';

const routes: Routes = [

  { path: '', redirectTo: '/body', pathMatch: 'full' },
  { path: 'usuario', component: PerfilUsuarioComponent },
  { path: 'CV', component: CVComponent },
  { path: 'ofertas', component: BuscarOfertasComponent },
  { path: 'postulaciones', component: PostulacionesComponent },
  { path: 'favoritos',component: FavoritosComponent },
  { path: 'visitas', component: VisitasPerfilComponent },
  { path: 'notificaciones', component: NotificacionesComponent },
  { path: 'empresas', component: EmpresasComponent },
  { path: 'salarios', component: SalariosComponent },
  { path: 'configuracion', component: ConfiguracionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }