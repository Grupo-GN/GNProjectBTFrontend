import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { BodyComponent } from './components/body/body.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { CVComponent } from './components/cv/cv.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { BuscarOfertasComponent } from './components/buscar-ofertas/buscar-ofertas.component';
import { PostulacionesComponent } from './components/postulaciones/postulaciones.component';
import { ReclutadoresComponent } from './components/reclutadores/reclutadores.component';
import { VisitasPerfilComponent } from './components/visitas-perfil/visitas-perfil.component';
import { AppRoutingModule } from './app-routing.module';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { MisAlertasComponent } from './components/mis-alertas/mis-alertas.component';
import { CerrarSesionComponent } from './components/cerrar-sesion/cerrar-sesion.component';


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    EmpresasComponent,
    ConfiguracionComponent,
    CVComponent,
    FavoritosComponent,
    NotificacionesComponent,
    BuscarOfertasComponent,
    PostulacionesComponent,
    ReclutadoresComponent,
    VisitasPerfilComponent,
    PerfilUsuarioComponent,
    MisAlertasComponent,
    CerrarSesionComponent
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
