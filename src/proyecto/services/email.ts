import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'http://localhost:3000/api/enviar-email'; // tu endpoint del backend

  constructor(public http: HttpClient) { }

  sendEmail(data: { email: string; subject: string; message: string }) {
    return this.http.post(this.apiUrl, data);
  }

}
