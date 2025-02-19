import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { Character } from './interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private http = inject( HttpClient )

  getAllCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>('http://localhost:3000/api/v1/mortalkombat');
  }

  getCharacterById(id: string): Observable<Character | undefined> {
    return this.http.get<Character>(`http://localhost:3000/api/v1/mortalkombat/${id}`).pipe(
      catchError( error => of(undefined))
    )
  }

}
