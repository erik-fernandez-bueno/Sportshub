import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioUsuarios {
  constructor(private firestore: AngularFirestore) {}

  getUsuario(usuarioId: string): Observable<any> {
    return this.firestore
      .collection('usuarios')
      .doc(usuarioId)
      .valueChanges();
  }
}
