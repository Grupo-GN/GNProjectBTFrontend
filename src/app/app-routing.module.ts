import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritosComponent } from './components/User/favoritos/favoritos.component';
import { CVComponent } from './components/User/cv/cv.component';
import { MiAreaComponent } from './components/User/mi-area/mi-area.component'; 
import { BuscarOfertasComponent } from './components/User/buscar-ofertas/buscar-ofertas.component';
import { PostulacionesComponent } from './components/User/postulaciones/postulaciones.component';
import { VisitasPerfilComponent } from './components/User/visitas-perfil/visitas-perfil.component';
import { NotificacionesComponent } from './components/User/notificaciones/notificaciones.component';
import { ConfiguracionComponent } from './components/User/configuracion/configuracion.component';
import { CerrarSesionComponent } from './components/User/cerrar-sesion/cerrar-sesion.component';
import { MisAlertasComponent } from './components/User/mis-alertas/mis-alertas.component';
import { ReclutadoresComponent } from './components/User/reclutadores/reclutadores.component';
import { PublicarOfertasComponent } from './components/User/publicar-ofertas/publicar-ofertas.component';
import { EmpresasComponent } from './components/User/empresas/empresas.component';
import { SalariosComponent } from './components/User/salarios/salarios.component';
import { EditComponent } from './components/User/edit/edit.component';
import { AboutComponent } from './components/about/about.component';
import { IniciarSesionComponent } from './components/Companys/iniciar-sesion/iniciar-sesion.component';


const routes: Routes =  [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'mi-area', component: MiAreaComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent},
  { path: 'Home', component: AboutComponent , data: {showSidenav:false} },
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
  { path: 'edit', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
