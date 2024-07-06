import { Component, EventEmitter, Output } from '@angular/core';

interface NavItem {
  routeLink: string;
  icon: string;
  label: string;
}


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData: NavItem[] = [
    {
      routeLink: '/usuario',
      icon: 'fas fa-user',
      label: 'Usuario'
    },
    {
      routeLink: '/CV',
      icon: 'fas fa-file-alt',
      label: 'Mi CV'
    },
    {
      routeLink: '/ofertas',
      icon: 'fas fa-search',
      label: 'Buscar'
    },
    {
      routeLink: '/postulaciones',
      icon: 'fas fa-check',
      label: 'Mis postulaciones'
    },
    {
      routeLink: '/favoritos',
      icon: 'fas fa-heart',
      label: 'Favoritos'
    },
    {
      routeLink: '/visitas',
      icon: 'far fa-eye',
      label: 'Visitas a mi Perfil'
    },
    {
      routeLink: '/notificaciones',
      icon: 'far fa-bell',
      label: 'Notificaciones'
    },
    {
      routeLink: '/empresas',
      icon: 'far fa-building',
      label: 'Empresas'
    },
    {
      routeLink: '/salarios',
      icon: 'fas fa-money-bill-wave',
      label: 'Salarios'
    },
    {
      routeLink: '/configuraciones',
      icon: 'fas fa-cog',
      label: 'Configuraciones'
    },
    {
      routeLink: '/CerrarSesion',
      icon: 'fas fa-sign-out-alt',
      label: 'Cerrar Sesion'
    }

  ];

  constructor() { }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}

