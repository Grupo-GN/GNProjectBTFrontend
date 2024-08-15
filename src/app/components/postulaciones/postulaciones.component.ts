import { Component } from '@angular/core';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.css']
})
export class PostulacionesComponent {
  searchCriteria = {
    cargo: '',
    lugar: ''
  };
  selectedTab = 'CV';

  selectTab(tabId: string) {
    this.selectedTab = tabId;
  }

  search() {
    console.log('Searching for:', this.searchCriteria);
    // Aquí puedes agregar la lógica para realizar la búsqueda
  }

}
