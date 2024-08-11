import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { CVComponent } from './components/cv/cv.component';
import { MiAreaComponent } from './components/mi-area/mi-area.component'; 
import { BuscarOfertasComponent } from './components/buscar-ofertas/buscar-ofertas.component';
import { PostulacionesComponent } from './components/postulaciones/postulaciones.component';
import { VisitasPerfilComponent } from './components/visitas-perfil/visitas-perfil.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { CerrarSesionComponent } from './components/cerrar-sesion/cerrar-sesion.component';
import { MisAlertasComponent } from './components/mis-alertas/mis-alertas.component';
import { ReclutadoresComponent } from './components/reclutadores/reclutadores.component';
import { PublicarOfertasComponent } from './components/publicar-ofertas/publicar-ofertas.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { SalariosComponent } from './components/salarios/salarios.component';

const routes: Routes = [
  { path: '', redirectTo: '/body', pathMatch: 'full' },
  { path: 'mi-area', component: MiAreaComponent },
  { path: 'CV', component: CVComponent },
  { path: 'buscar-ofertas', component: BuscarOfertasComponent },
  { path: 'postulaciones', component: PostulacionesComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'alertas', component: MisAlertasComponent }, // Nuevo componente
  { path: 'visitas', component: VisitasPerfilComponent },
  { path: 'notificaciones', component: NotificacionesComponent },// Nuevo componente
  { path: 'reclutadores', component: ReclutadoresComponent },
  { path: 'publicar-ofertas', component: PublicarOfertasComponent }, // Nuevo componente
  { path: 'configuraciones', component: ConfiguracionComponent },
  { path: 'cerrar-sesion', component: CerrarSesionComponent },
  { path: 'empresas', component: EmpresasComponent },
  { path: 'salarios', component: SalariosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
