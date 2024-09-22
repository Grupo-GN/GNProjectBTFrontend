import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private sidenavVisibilitySource = new Subject<boolean>();
  sidenavVisibility$ = this.sidenavVisibilitySource.asObservable();

  // Método para actualizar la visibilidad del sidenav
  setSidenavVisibility(isVisible: boolean) {
    this.sidenavVisibilitySource.next(isVisible);
  }
}