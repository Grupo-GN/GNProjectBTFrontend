import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { SidebarComponent } from './sidebar/sidebar.component'; 
import { MatTabsModule } from '@angular/material/tabs';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { BodyComponent } from './body/body.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { CVComponent } from './cv/cv.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { BuscarOfertasComponent } from './buscar-ofertas/buscar-ofertas.component';
import { PostulacionesComponent } from './postulaciones/postulaciones.component';
import { ReclutadoresComponent } from './reclutadores/reclutadores.component';
import { SalariosComponent } from './salarios/salarios.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { VisitasPerfilComponent } from './visitas-perfil/visitas-perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainComponent,
    MenuLateralComponent,
    BodyComponent,
    ConfiguracionComponent,
    CVComponent,
    EmpresasComponent,
    FavoritosComponent,
    NotificacionesComponent,
    BuscarOfertasComponent,
    PostulacionesComponent,
    ReclutadoresComponent,
    SalariosComponent,
    SidenavComponent,
    PerfilUsuarioComponent,
    VisitasPerfilComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
