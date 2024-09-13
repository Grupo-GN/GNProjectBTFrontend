import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.example.com/users'; // Reemplaza con tu URL de API

  constructor(private http: HttpClient) { }

  changeEmail(userId: number, newEmail: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/email`, { newEmail });
  }

  changePassword(userId: number, newPassword: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/password`, { newPassword });
  }
}