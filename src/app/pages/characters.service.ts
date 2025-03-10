import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { Character } from './interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private baseUrl: string =  environment.api   

  private http = inject( HttpClient )

  getAllCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}`);
  }

  getCharacterById(id: string): Observable<Character | undefined> {
    return this.http.get<Character>(`${this.baseUrl}/${id}`).pipe(
      catchError( error => of(undefined))
    )
  }

  getCharacterByName(name: string): Observable<Character | undefined> {
    return this.http.get<Character>(`${this.baseUrl}/${name}`).pipe(
      catchError( error => of(undefined))
    )
  }

  addCharacter( character: Character ): Observable<Character> {
    return this.http.post<Character>(`${this.baseUrl}`, character)
  }

  updateCharacter(id: string, character: Character): Observable<Character> {
    return this.http.patch<Character>(`${this.baseUrl}/${id}`, character);
  }

  deleteCharacter(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${id}`)
    .pipe(
      map( res => true),
      catchError( err => of(false))
    )
  }

}
