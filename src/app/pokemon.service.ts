import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon'; // URL base para la PokeAPI
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  
  constructor(private http: HttpClient) { }

  getPokemons(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?limit=10`); // Obtiene los primeros 10 Pokémon, puedes ajustar el límite según necesites
  }
  getPokemon(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${name}`);
  }
  searchPokemons(term: string): Observable<any> {
    const url = `${this.baseUrl}/${term.toLowerCase()}`;
    return this.http.get<any>(url);
}

}