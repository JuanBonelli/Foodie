import { Component } from '@angular/core';
import { LoginButtonComponent } from '../../shared/components/login-button/login-button.component';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { UserProfileComponent } from '../../shared/components/user-profile/user-profile.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginButtonComponent, TopBarComponent, UserProfileComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
