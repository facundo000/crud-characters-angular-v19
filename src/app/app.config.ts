import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideHttpClient(),
    ...(AuthModule.forRoot({
      domain: `${environment.DOMINIO_AUTH0}`,
      clientId: `${environment.CLIENT_ID}`,
      authorizationParams: {
        redirect_uri: window.location.origin,
      }
    }).providers || [])
  ]
};

