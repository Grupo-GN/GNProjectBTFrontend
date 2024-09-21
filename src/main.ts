import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Routes } from '@angular/router';
import { IniciarSesionComponent } from './app/components/User/iniciar-sesion/iniciar-sesion.component';

if (environment.production) {
  enableProdMode();
}

const routes: Routes = [
  { path: 'User/Iniciar-sesion', component: IniciarSesionComponent },
]
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));  