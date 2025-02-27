import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';
//import { es_ES, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authHttpInterceptorFn } from '@auth0/auth0-angular';
import { environment } from '../environments/environment.development';

registerLocaleData(es);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([
      authHttpInterceptorFn,
    ])),
    provideAuth0({
      domain: environment.domainAuth,
      clientId: environment.clientIdAuth,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: environment.audienceAuth,
        scope: environment.scopeAuth,
      },

      httpInterceptor:{
        allowedList:[
          {
            uri: `${environment.baseUrl}/api/*`,
            tokenOptions:{
              authorizationParams:{
                audience: `${environment.audienceAuth}`,
              }
            }
          }
        ]
      }
    }),
  ],
};
