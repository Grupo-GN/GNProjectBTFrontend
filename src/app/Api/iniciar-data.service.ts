import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IniciarDataService {
 
  private apiUrl = 'http://localhost:8081/company'; // URL de tu API

  constructor(private http: HttpClient) { }

  enviarDatos(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Indica que el contenido es JSON
    });

    return this.http.post(this.apiUrl, data, { headers });
  }
  
}
