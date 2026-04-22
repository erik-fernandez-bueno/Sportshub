import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductesService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getProductesByGenere(sexe: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productes?sexe=${sexe}`);
  }
  getProducteById(id: number) {
    return this.http.get<any>(`http://localhost:3000/api/productes/${id}`);
  }
}
