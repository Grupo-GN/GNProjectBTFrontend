
import { Component} from '@angular/core';


@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent {
  selectedId: number = 0;
  selectedName: string = '';

  searchCompanies() {
    
    console.log('Searching for companies with:', this.selectedName);
    
  }
}