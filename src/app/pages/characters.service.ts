import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Character } from './interfaces/character.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private baseUrl: string =  environment.api   

  private http = inject( HttpClient )
  private router = inject(Router)

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      // Solo redirigir al login si no es una ruta pública
      if (!this.isPublicRoute(error.url!)) {
        this.router.navigate(['/login'])
      }
    }
    return throwError(() => error)
  }

  private isPublicRoute(url: string): boolean {
    // Verificar si la URL es para listar o buscar personajes
    return url?.includes('/characters') && !url?.includes('/add') && !url?.includes('/edit')
  }

  getAllCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}`).pipe(
      catchError(error => {
        console.error('Error fetching characters:', error)
        return of([])
      })
    )
  }

  getCharacterById(id: string): Observable<Character | undefined> {
    return this.http.get<Character>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching character:', error)
        return of(undefined)
      })
    )
  }

  getCharacterByName(name: string): Observable<Character | undefined> {
    return this.http.get<Character>(`${this.baseUrl}/${name}`).pipe(
      catchError(error => {
        console.error('Error searching character:', error)
        return of(undefined)
      })
    )
  }

  addCharacter( character: Character ): Observable<Character> {
    return this.http.post<Character>(`${this.baseUrl}`, character).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  updateCharacter(id: string, character: Character): Observable<Character> {
    return this.http.patch<Character>(`${this.baseUrl}/${id}`, character).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  deleteCharacter(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      map( res => true),
      catchError(error => {
        this.handleError(error)
        return of(false)
      })
    )
  }

}
