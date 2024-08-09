import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-buscar-ofertas',
  templateUrl: './buscar-ofertas.component.html',
  styleUrls: ['./buscar-ofertas.component.css']
})
export class BuscarOfertasComponent implements OnInit {
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
}
