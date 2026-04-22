import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HistorialService {
  constructor(private http: HttpClient) {}

  getHistorial(email: string): Observable<any> {
    const headers = new HttpHeaders().set('x-user-email', email);
    return this.http.get('http://localhost:3000/api/historial', { headers });
  }
}
