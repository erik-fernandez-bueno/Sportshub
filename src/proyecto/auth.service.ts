import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  private usuariSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('usuariLoguejat') || 'null'));
  usuari$ = this.usuariSubject.asObservable();

  actualitzarUsuari(usuari: any) {
    localStorage.setItem('usuariLoguejat', JSON.stringify(usuari));
    this.usuariSubject.next(usuari);
  }

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
  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-email?email=${encodeURIComponent(email)}`);
  }

  enviarReview(email: string, review: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/review`, { email, review });
  }
}
