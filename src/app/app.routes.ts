import { Routes } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/settings-main/settings/settings.component';
import { PreferencesComponent } from './pages/settings-main/preferences/preferences.component';
import { NotificationsComponent } from './pages/settings-main/notifications/notifications.component';
import { TermsConditionsComponent } from './pages/settings-main/terms-conditions/terms-conditions.component';
import { SupportComponent } from './pages/settings-main/support/support.component';
import { ExpirationComponent } from './pages/expiration-products/expiration.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { QuestionnaireComponent } from './pages/questionary/questionnaire-welcoming/questionnaire.component';


export const routes: Routes = [
  {
    path: 'inventory',
    loadChildren: () =>
      import('./pages/inventory/inventory.routes').then(
        (n) => n.INVENTORY_ROUTES
      ),
    canActivate: [AuthGuard],
  },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'preferences', component: PreferencesComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'termsAndConditions', component: TermsConditionsComponent },
  { path: 'support', component: SupportComponent },
  { path: 'expiration-products', component: ExpirationComponent },
  { path: 'questionnaire', component: QuestionnaireComponent},
  {
    path: 'create',
    loadChildren: () =>
      import('./pages/upload/upload.routes').then(
        (n) => n.UPLOAD_ROUTES
      ),
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./pages/recipes/recipe.routes').then((n) => n.RECIPES_ROUTES),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'inventory' },
];
