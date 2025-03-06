import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
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

  getCharacterByName(name: string): Observable<Character | undefined> {
    return this.http.get<Character>(`http://localhost:3000/api/v1/mortalkombat/${name}`).pipe(
      catchError( error => of(undefined))
    )
  }

  addCharacter( character: Character ): Observable<Character> {
    return this.http.post<Character>(`http://localhost:3000/api/v1/mortalkombat`, character)
  }

  updateCharacter(id: string, character: Character): Observable<Character> {
    return this.http.patch<Character>(`http://localhost:3000/api/v1/mortalkombat/${id}`, character);
  }

  deleteCharacter(id: string): Observable<boolean> {
    return this.http.delete(`http://localhost:3000/api/v1/mortalkombat/${id}`)
    .pipe(
      map( res => true),
      catchError( err => of(false))
    )
  }

}
