import { Component, OnInit } from '@angular/core';
import { SidenavService } from './sidenav.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'GNProjectBT';

  isSideNavCollapsed = false;
  screenWidth = 0;
  isSideNavVisible = true; 

  constructor(private router: Router, private sidenavService: SidenavService) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const currentRoute = this.router.routerState.root.firstChild;
        this.isSideNavVisible = currentRoute?.snapshot.data['showSidenav'] !== false;
      });

    this.sidenavService.sidenavVisibility$.subscribe(isVisible => {
      this.isSideNavVisible = isVisible;
    });
  }
  
  onToggleSideNav(data: SideNavToggle) : void{

    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  
    
}
}
