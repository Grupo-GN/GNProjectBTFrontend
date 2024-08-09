import { animate, animation, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
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
  styleUrls: ['./sidenav.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter',[
        style({opacity: 0}),
        animate('350ms',
      style({opacity:1})
        )
      ]),
      transition(':leave',[
        style({opacity: 0}),
        animate('350ms',
      style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate',[
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({transiform: 'rotate(0deg)', offset: '0'}),
            style({transiform: 'rotate(2turn)', offset: '1'}),
          ])
        )
      ])
    ])
    
  ]
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;

  @HostListener('window:rezise', ['$event'])
  onRisize(event:any){
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
      
  }
  navData: NavItem[] = [
    {
      routeLink: '/mi-area',
      icon: "fas fa-home",
      label: 'Mi Area'
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
      routeLink: '/alertas',
      icon: 'far fa-bell',
      label: 'Mis alertas'
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
      routeLink: '/reclutadores',
      icon: 'fas fa-user-tie',
      label: 'Reclutadores'
    },
    {
      routeLink: '/publicar-ofertas',
      icon: 'fas fa-bullhorn',
      label: 'Publica ofertas gratis'
    },
    {
      routeLink: '/configuraciones',
      icon: 'fas fa-cog',
      label: 'Configuraciones'
    },
    {
      routeLink: '/cerrar-sesion',
      icon: 'fas fa-sign-out-alt',
      label: 'Cerrar Sesion'
    }
  ];


  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}
