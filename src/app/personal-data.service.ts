import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService {
  private apiUrl = 'http://localhost:8080/Candidatos/0'; 

  constructor(private http: HttpClient) { }
  private personalDataSubject = new BehaviorSubject<any>(null);
  personalData$ = this.personalDataSubject.asObservable();

  setPersonalData(data: any) {
    this.personalDataSubject.next(data);
  }



  // Método para obtener datos del formulario
  getPersonalData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Método para guardar 
  savePersonalData(personalData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, personalData);
  }
}
