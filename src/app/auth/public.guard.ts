import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { AuthzService } from './authz.service';

export const publicGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthzService);
  const router = inject(Router);

  return auth.isAuthenticated().pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        router.navigate(['/personajes']);
        return false;
      }
      return true;
    })
  );
}; 