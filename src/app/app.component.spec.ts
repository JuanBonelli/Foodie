import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment.development';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';

fdescribe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
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
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'angular-sas-test' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-sas-test');
  });
});
