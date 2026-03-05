import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  register(usuari: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, usuari);
  }

  login(credencials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credencials);
  }

  updatePerfil(usuari: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/perfil`, usuari);
  }
}
