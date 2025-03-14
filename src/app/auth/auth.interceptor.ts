import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthzService } from './authz.service';
import { catchError, mergeMap, of } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthzService);
  const router = inject(Router);

  // Lista de endpoints públicos
  const publicEndpoints = [
    'api/v1/mortalkombat', // GET para listar personajes
    // '/api/characters/', GET para buscar por ID o nombre
  ];

  // Comprobar si la URL es pública
  const isPublicEndpoint = publicEndpoints.some(endpoint => 
    req.url.includes(endpoint) && req.method === 'GET'
  );

  // Si es un endpoint público, no añadimos el token
  if (isPublicEndpoint) {
    return next(req);
  }

  // Para el resto de endpoints, añadimos el token
  return authService.getAccessToken().pipe(
    catchError(error => {
      console.error('Error obteniendo token:', error);
      // Si hay un error al obtener el token, redirigir al login
      router.navigate(['/login']);
      return of(null);
    }),
    mergeMap(token => {
      if (!token) {
        // Si no hay token, simplemente pasamos la solicitud original
        // El backend rechazará la solicitud con 401 si es necesario
        return next(req);
      }
      
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)        
      });
      return next(authReq);
    })
  );
}; 