import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { CVComponent } from './cv/cv.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { BuscarOfertasComponent } from './buscar-ofertas/buscar-ofertas.component';
import { PostulacionesComponent } from './postulaciones/postulaciones.component';
import { ReclutadoresComponent } from './reclutadores/reclutadores.component';
import { SalariosComponent } from './salarios/salarios.component';
import { VisitasPerfilComponent } from './visitas-perfil/visitas-perfil.component';
import { AppRoutingModule } from './app-routing.module';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';


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
    SalariosComponent,
    VisitasPerfilComponent,
    PerfilUsuarioComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
