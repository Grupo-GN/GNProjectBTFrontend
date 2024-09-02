import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';

@Component({
  selector: 'app-mis-alertas',
  templateUrl: './mis-alertas.component.html',
  styleUrls: ['./mis-alertas.component.css']
})
export class MisAlertasComponent implements OnInit {
  suggestionsVisible: string | null = null;
  lastSearches: string[] = [''];
  popularJobs: string[] = [
    'Atención al cliente',
    'Asesor/a de ventas',
    'Agente de seguridad',
    'Operarios/as de limpieza',
    'Promotor/a de ventas',
    'Call center'
  ];
  CountrySearches: string[] = [''];
  popularPlaces: string[] = [
    'Arequipa',
    'Lima',
    'Cusco',
    'Trujillo',
    'Chiclayo',
    'Iquitos'
  ];
  filteredPlaces: string[] = [...this.popularPlaces];
  filteredJobs: string[] = [...this.popularJobs];
  searchTerm: string = '';
  placeTerm: string = '';
  private searchTerms = new Subject<string>();
  private placeTerms = new Subject<string>();
  selectedView: string = 'localizacion';
  showNewAlertBox: boolean = false;
  alertas: Array<{ id: number, cargo: string, categorias: string[], regiones: string[] }> = [];
  showSuccessMessage: boolean = false;
  newAlert: { id: number, cargo: string, categorias: string[], regiones: string[] } = { id: 0, cargo: '', categorias: [], regiones: [] };
  editMode: boolean = false;
  editAlertId: number | null = null;
  itemsPerPage: number = 5; // Número de alertas por página
  currentPage: number = 1; // Página actual
  editingIndex: number | null = null; // Índice de la alerta que se está editando
  alertaSeleccionada: any;
  showEditAlertBox: boolean = false;  // Nueva variable para manejar la visibilidad del cuadro de edición


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
  // Cálculo de la cantidad total de páginas
get totalPages(): number {
  return Math.ceil(this.alertas.length / this.itemsPerPage);
}
// Array con el número total de páginas
get totalPagesArray(): number[] {
return Array.from({ length: this.totalPages }, (_, i) => i + 1);
}

// Obtener las alertas de la página actual
get paginatedAlertas(): Array<{ id: number, cargo: string, categorias: string[], regiones: string[] }> {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  return this.alertas.slice(start, start + this.itemsPerPage);
}



//metodos adicionales para la gestion de alertas
onCheckboxChange(event: any, type: string) {
  const value = event.target.value;
  const isChecked = event.target.checked;

  if (type === 'categoria') {
    this.toggleSelection(this.newAlert.categorias, value, isChecked);
  } else if (type === 'region') {
    this.toggleSelection(this.newAlert.regiones, value, isChecked);
  }
}

private toggleSelection(array: string[], value: string, isChecked: boolean) {
  if (isChecked) {
    if (!array.includes(value)) {
      array.push(value);
    }
  } else {
    const index = array.indexOf(value);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
}
guardarAlerta() {
  // Oculta el cuadro de edición o el cuadro de nueva alerta inmediatamente
  this.showNewAlertBox = false;
  this.showEditAlertBox = false;

  if (this.editMode && this.editAlertId !== null) {
    const index = this.alertas.findIndex(alert => alert.id === this.editAlertId);
    if (index > -1) {
      this.alertas[index] = { ...this.newAlert, id: this.editAlertId };
    }
    this.editMode = false;
    this.editAlertId = null;
    this.editingIndex = null;
  } else {
    const newId = this.alertas.length > 0 ? Math.max(...this.alertas.map(a => a.id)) + 1 : 1;
    this.alertas.unshift({ ...this.newAlert, id: newId });
  }

  this.saveAlertas();

  // Restablece el formulario
  this.newAlert = { id: 0, cargo: '', categorias: [], regiones: [] };
  
  // Muestra el mensaje de éxito
  this.showSuccessMessage = true;
}


toggleNewAlertBox() {
  this.showNewAlertBox = !this.showNewAlertBox;
  if (!this.showNewAlertBox) {
      // Reset newAlert cuando se oculta el formulario
      this.newAlert = { id: 0, cargo: '', categorias: [], regiones: [] };
      this.editMode = false;
      this.editAlertId = null;
      this.editingIndex = null; // Resetea el índice de edición

  }
}


editAlerta(alerta: { id: number, cargo: string, categorias: string[], regiones: string[] }, index: number) {
this.newAlert = { 
  id: alerta.id,
  cargo: alerta.cargo,
  categorias: [...alerta.categorias], 
  regiones: [...alerta.regiones] 
};
this.editMode = true;
this.editAlertId = alerta.id;
this.editingIndex = index; 
this.showEditAlertBox = true;  // Muestra el cuadro de edición
}
cancelEdit() {
this.editMode = false;
this.editAlertId = null;
this.editingIndex = null; // Resetea el índice de edición
this.showEditAlertBox = false;  // Oculta el cuadro de edición
}


deleteAlerta(alertId: number) {
  this.alertas = this.alertas.filter(alert => alert.id !== alertId);
  this.saveAlertas();
}

closeSuccessMessage() {
  this.showSuccessMessage = false;
}

private saveAlertas() {
  try {
    localStorage.setItem('alertas', JSON.stringify(this.alertas));
  } catch (error) {
    console.error('Error saving alertas to localStorage', error);
  }
}

private loadAlertas() {
  try {
    const storedAlertas = localStorage.getItem('alertas');
    if (storedAlertas) {
      this.alertas = JSON.parse(storedAlertas);
    }
  } catch (error) {
    console.error('Error loading alertas from localStorage', error);
  }
}
//cambiar pagina
changePage(page: number) {
  if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
  }
}
seleccionarAlerta(alerta: any) {
if (this.alertaSeleccionada === alerta) {
  this.alertaSeleccionada = null; // Desmarca si ya está seleccionado
} else {
  this.alertaSeleccionada = alerta;
}
}


  showSuggestions(type: string): void {
    this.suggestionsVisible = type;
  }

  hideSuggestions(): void {
    setTimeout(() => {
      this.suggestionsVisible = null;
    }, 1000000); // Ajusta el tiempo de espera si es necesario
  }

  onInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.searchTerms.next(input);
  }

  onInputPlace(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.placeTerms.next(input);
  }

  search(term: string): Observable<string[]> {
    return this.http.get<string[]>(`https://api.example.com/search?query=${term}`);
  }

  getSearchUrl(search: string): string {
    return `/trabajo-de-${search.replace(/\s+/g, '-').toLowerCase()}`;
  }

  searchPlace() {
    this.search(this.placeTerm).subscribe(results => {
      this.filteredPlaces = results;
    });
  }

  deleteSearch(search: string): void {
    this.lastSearches = this.lastSearches.filter(s => s !== search);
  }

  selectPlace(place: string): void {
    this.placeTerm = place;
    console.log('Place selected:', place);
  }

  selectJob(job: string): void {
    this.searchTerm = job;
    console.log('Job selected:', job);
  }

  onSubmit(): void {
    console.log('Form submitted with search term:', this.searchTerm);
    console.log('Form submitted with place term:', this.placeTerm);
    this.performSearch();
  }

  closeSearchBox() {
    console.log('Cerrando cuadro de búsqueda');
    this.suggestionsVisible = null;
  }

  clearSearchTerm() {
    this.searchTerm = '';
  }

  clearPlaceTerm() {
    this.placeTerm = '';
  }

  performSearch() {
    console.log('Realizando búsqueda con los términos:');
    console.log('Término de búsqueda:', this.searchTerm);
    console.log('Término de lugar:', this.placeTerm);

    this.search(this.searchTerm).subscribe(results => {
      this.filteredJobs = results;
    });

    this.searchPlace();
  }

  trackMenuClick(section: string) {
    console.log(`Navegando a ${section}`);
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isInsideJobSearch = target.closest('#prof-cat-search-input') || target.closest('.autocomplete.job');
    const isInsidePlaceSearch = target.closest('#place-search-input') || target.closest('.autocomplete.place');
    if (!isInsideJobSearch) {
      this.suggestionsVisible = this.suggestionsVisible === 'job' ? null : this.suggestionsVisible;
    }
    if (!isInsidePlaceSearch) {
      this.suggestionsVisible = this.suggestionsVisible === 'place' ? null : this.suggestionsVisible;
    }
  }

  onInputClick(event: MouseEvent) {
    event.stopPropagation();
  }

  onMenuClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
