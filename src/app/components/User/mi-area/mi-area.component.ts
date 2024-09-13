import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PokemonService } from 'src/app/Api/pokemon.service';

@Component({
  selector: 'app-mi-area',
  templateUrl: './mi-area.component.html',
  styleUrls: ['./mi-area.component.css']
})
export class MiAreaComponent implements OnInit{

  searchTerm: string = '';
  pokemons: any[] = [];
  pokemon: any;
  error: string | null = null;
  

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

  placeTerm: string = '';
  private searchTerms = new Subject<string>();
  private placeTerms = new Subject<string>();
  selectedView: string = 'localizacion';

  confirmDelete: boolean = false;
  privacyForm: any;
  


  constructor(private http: HttpClient , private fb: FormBuilder , private pokemonService: PokemonService) {

    this.privacyForm = this.fb.group({
      privacyLevel: ['1']  // valor por defecto
    });
  }
  
  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.fetchPokemonData(this.searchTerm.trim().toLowerCase()); // Normaliza el término
    } else {
      console.log('El término de búsqueda está vacío.');
    }
  }


  fetchPokemonData(term: string): void {
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${term}`).subscribe(
      (data: any) => {
        this.pokemon = data;
        console.log('Datos del Pokémon:', data); // Verifica que recibes los datos
      },
      error => {
        console.error('Error fetching data', error);
        this.pokemon = null; // Resetea el estado en caso de error
      }
    );
  }

  ngOnInit() : void {
    if (this.searchTerm) {
      this.pokemonService.getPokemon(this.searchTerm.toLowerCase()).subscribe(
        data => {
          this.pokemon = data;
          console.log(this.pokemon);
        },
        error => {
          console.error('Error fetching data', error);
          this.pokemon = null;
        }
      );
    }


    this.pokemonService.getPokemons().subscribe((data: { results: any[]; }) => {
      this.pokemons = data.results; // PokeAPI devuelve los datos en la propiedad 'results'
    });
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.search(term).pipe(
        catchError(err => {
          console.error('Error in job search:', err);
          return of([]); // Devuelve un array vacío en caso de error
        })
      ))
    ).subscribe(results => {
      this.filteredJobs = results;
    });
  
    this.placeTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.search(term).pipe(
        catchError(err => {
          console.error('Error in place search:', err);
          return of([]); // Devuelve un array vacío en caso de error
        })
      ))
    ).subscribe(results => {
      this.filteredPlaces = results;
    });
    

  
  }
  clearSearchTerm(): void {
    this.searchTerm = '';
    this.pokemon = null;
  }

    
  getPokemonImage(url: string): string {
    const id = url.split('/')[6];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
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
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=100`; // Puedes ajustar el límite
    return this.http.get<any>(apiUrl).pipe(
      map(response => 
        response.results
          .filter((item: any) => item.name.includes(term.toLowerCase())) // Filtrar por término
          .map((item: any) => item.name) // Mapear nombres
      )
    );
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

  selectJob(job: string): void {
    this.searchTerm = job;
    this.suggestionsVisible = null; // Ocultar sugerencias después de la selección
    console.log('Job selected:', job);
  }
  
  selectPlace(place: string): void {
    this.placeTerm = place;
    this.suggestionsVisible = null; // Ocultar sugerencias después de la selección
    console.log('Place selected:', place);
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



  clearPlaceTerm() {
    this.placeTerm = '';
  }

  performSearch() {
    console.log('Realizando búsqueda con los términos:');
    console.log('Término de búsqueda:', this.searchTerm);
    console.log('Término de lugar:', this.placeTerm);
  
    // Mostrar mensaje de cargando
    this.filteredJobs = ['Cargando resultados...'];
  
    this.search(this.searchTerm).subscribe(results => {
      this.filteredJobs = results.length > 0 ? results : ['No se encontraron resultados'];
    });
  
    this.searchPlace();
  }
  
  trackMenuClick(item: string) {
    console.log(`Menú seleccionado: ${item}`);
    
  }

  @HostListener('document:click', ['$event'])
handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const isInsideJobSearch = target.closest('#prof-cat-search-input') || target.closest('.autocomplete.job');
  const isInsidePlaceSearch = target.closest('#place-search-input') || target.closest('.autocomplete.place');
  if (!isInsideJobSearch && this.suggestionsVisible === 'job') {
    this.suggestionsVisible = null;
  }
  if (!isInsidePlaceSearch && this.suggestionsVisible === 'place') {
    this.suggestionsVisible = null;
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
  onDeleteAccount(): void {
    if (this.confirmDelete) {
      console.log('Account deletion confirmed');
      // Lógica para eliminar la cuenta
    } else {
      console.log('Please confirm account deletion');
    }
  }

  toggleConfirmDelete(): void {
    this.confirmDelete = !this.confirmDelete;
    if (this.confirmDelete) {
      // Mostrar modal de confirmación aquí
    }
  }


  onPrivacySubmit(): void {
    const privacyLevel = this.privacyForm.get('privacyLevel')?.value;
    console.log(`Selected privacy level: ${privacyLevel}`);
    // Aquí puedes agregar la lógica para cambiar el nivel de privacidad
  }
  

}
