import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import {  Renderer2 } from '@angular/core';


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

  toggleView(view: string): void {
    this.selectedView = this.selectedView === view ? '' : view;
  }

  
        
}
