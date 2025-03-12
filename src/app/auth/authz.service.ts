import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthzService {

  constructor(public auth: AuthService) { }

  login(): void {
    // Guardar la URL actual para redirigir después del login
    const redirectUri = window.location.origin + window.location.pathname;
    
    this.auth.loginWithRedirect({
      appState: { target: redirectUri }
    });
  }

  logout(): void {
    
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }

  signUp():void {
    
    this.auth.loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup'
      }
    });
  }

  getUser() {
    return this.auth.user$;
  }

  isAuthenticated(): Observable<boolean> {
    return this.auth.isAuthenticated$;    
  }

  getAccessToken(): Observable<string> {
    return this.auth.getAccessTokenSilently();
  }
}
