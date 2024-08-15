import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-mis-alertas',
  templateUrl: './mis-alertas.component.html',
  styleUrls: ['./mis-alertas.component.css']
})
export class MisAlertasComponent implements OnInit {

  showSuccessPopup: boolean = false;
  showErrorPopup: boolean = false;
  showForm: boolean = false;
  alertData = { cargo: '', categories: [] as string[], regions: [] as string[] };
  categories = [{ id: '1', name: 'Administracion / Oficina' }, { id: '2', name:'CallCenter / Telemercadeo' }, { id: '3', name:'CallCenter / Telemercadeo' }, { id: '2', name:'CallCenter / Telemercadeo' } ,{ id: '2', name:'CallCenter / Telemercadeo' }, { id: '2', name:'CallCenter / Telemercadeo' }, { id: '2', name:'CallCenter / Telemercadeo' }, { id: '2', name:'CallCenter / Telemercadeo' }, { id: '2', name:'CallCenter / Telemercadeo'}, { id: '2', name:'CallCenter / Telemercadeo' }, { id: '2', name:'CallCenter / Telemercadeo' }, { id: '2', name:'CallCenter / Telemercadeo' }, { id: '2', name:'CallCenter / Telemercadeo' }, { id: '2', name:'CallCenter / Telemercadeo' }, { id: '2', name:'CallCenter / Telemercadeo' }, { id: '2', name:'CallCenter / Telemercadeo' } ,{ id: '2', name:'CallCenter / Telemercadeo' } ,{ id: '2', name:'CallCenter / Telemercadeo' },{ id: '2', name:'CallCenter / Telemercadeo' } ,{ id: '2', name:'CallCenter / Telemercadeo' } ,{ id: '2', name:'CallCenter / Telemercadeo' }, { id: '2', name:'CallCenter / Telemercadeo' },{ id: '2', name:'CallCenter / Telemercadeo' }];
  regions = [{ id: '1', name: 'Lima' }, { id: '2', name: 'Apurimac' }, { id: '3', name: 'Apurimac' }, { id: '4', name: 'Apurimac' }, { id: '5', name: 'Apurimac' }, { id: '6', name: 'Apurimac' }, { id: '7', name: 'Apurimac' } , { id: '8', name: 'Apurimac' }, { id: '9', name: 'Apurimac' }, { id: '10', name: 'Apurimac' }, { id: '11', name: 'Apurimac' },{ id: '12', name: 'Apurimac' },{ id: '13', name: 'Apurimac' },{ id: '14', name: 'Apurimac' },{ id: '2', name: 'Apurimac' },{ id: '2', name: 'Apurimac' },{ id: '2', name: 'Apurimac' },{ id: '2', name: 'Apurimac' },{ id: '2', name: 'Apurimac' },{ id: '2', name: 'Apurimac' },{ id: '2', name: 'Apurimac' },{ id: '2', name: 'Apurimac' },{ id: '2', name: 'Apurimac' },{ id: '2', name: 'Apurimac' }];
  hasAlerts: boolean = false;
  
  suggestionsVisible: string | null = null;
  lastSearches = ['atencion al cliente en arequipa'];
  popularJobs = [
    'Atención al cliente',
    'Asesor/a de ventas',
    'Agente de seguridad',
    'Operarios/as de limpieza',
    'Promotor/a de ventas',
    'Call center'
  ];

  CountrySearches = ['atencion al cliente en arequipa'];
  popularPlaces = [
    'Arequipa',
    'Lima',
    'Cusco',
    'Trujillo',
    'Chiclayo',
    'Iquitos'
  ];
  filteredPlaces = [...this.popularPlaces];
  filteredJobs = [...this.popularJobs];
  searchTerm = '';
  placeTerm = '';
  private searchTerms = new Subject<string>();
  private placeTerms = new Subject<string>();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.search(term))
    ).subscribe(results => {
      this.filteredJobs = results;
    });

    this.placeTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.search(term))
    ).subscribe(results => {
      this.filteredPlaces = results;
    });
  }

  showSuggestions(type: string) {
    this.suggestionsVisible = type;
  }
  showNewAlertForm(): void {
    this.showForm = true;
  }

  hideSuggestions() {
    setTimeout(() => {
      this.suggestionsVisible = null;
    }, 10000);
  }

  onInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.searchTerms.next(input);
  }

  onInputPlace(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.placeTerms.next(input);
  }
  onCategoryChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.alertData.categories.push(input.value);
    } else {
      this.alertData.categories = this.alertData.categories.filter(cat => cat !== input.value);
    }
  }

  onRegionChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value; // Capturamos el valor del input

    if (input.checked) {
      this.alertData.regions.push(value);
    } else {
      this.alertData.regions = this.alertData.regions.filter(reg => reg !== value);
    }
  }

  search(term: string): Observable<string[]> {
    return this.http.post<string[]>('https://pe.computrabajo.com/', { query: term });
  }

  getSearchUrl(search: string): string {
    return `/trabajo-de-${search.replace(/\s+/g, '-').toLowerCase()}`;
  }

  deleteSearch(search: string) {
    this.lastSearches = this.lastSearches.filter(s => s !== search);
  }

  selectPlace(place: string) {
    
    console.log('Place selected:', place);
  }

  selectJob(job: string) {
  
    console.log('Job selected:', job);
  }


  onSubmit() {
  
    console.log('Form submitted with search term:', this.searchTerm);
    console.log('Form submitted with place term:', this.placeTerm);
  }
  selectedView: string = 'localizacion'; 

  toggleView(view: string): void {
    if (this.selectedView === view) {
    
      this.selectedView = '';
    } else {
      
      this.selectedView = view;
    }
  }

  saveAlert(): void {
    // Aquí se realizaría la lógica para guardar la alerta
    const isDuplicate = false; // Aquí debes implementar la lógica para detectar duplicados

    if (isDuplicate) {
      this.showErrorPopup = true;
      setTimeout(() => {
        this.showErrorPopup = false;
      }, 3000); // El popup de error se oculta después de 3 segundos
    } else {
      this.showSuccessPopup = true;
      setTimeout(() => {
        this.showSuccessPopup = false;
      }, 3000); // El popup de éxito se oculta después de 3 segundos
      this.hasAlerts = true;
      this.showForm = false; // Ocultar el formulario después de guardar
    }
  }
  cancelAlert(): void {
    this.showForm = false;
  }
  closeSearchBox() {
    console.log('Cerrando cuadro de búsqueda');
    this.suggestionsVisible = null;
  }
  performSearch() {
    console.log('Realizando búsqueda con los términos:');
    console.log('Término de búsqueda:', this.searchTerm);
    console.log('Término de lugar:', this.placeTerm);

    this.search(this.searchTerm).subscribe(results => {
      this.filteredJobs = results;
    });
  }
  clearSearchTerm() {
    this.searchTerm = '';
  }
  
  clearPlaceTerm() {
    this.placeTerm = '';
  }

}
