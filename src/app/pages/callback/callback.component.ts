import { Component } from '@angular/core';
import { AuthzService } from '../../auth/authz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  imports: [],
  template: '<div class="text-center p-8">Procesando autenticación...</div>',
})
export class CallbackComponent { 
  constructor(private auth: AuthzService, private router: Router) {
    // Al cargar el componente, verificamos el estado de autenticación
    this.auth.isAuthenticated().subscribe(isAuth => {
      console.log('Callback - Estado de autenticación:', isAuth);
      if (isAuth) {
        this.router.navigate(['/']);
      }
    });
  }
}
