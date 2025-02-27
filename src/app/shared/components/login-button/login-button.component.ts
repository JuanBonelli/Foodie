import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.scss'
})
export class LoginButtonComponent implements OnInit{

  constructor(public auth: AuthService, private router: Router){}

  ngOnInit(): void{
    this.auth.isAuthenticated$.subscribe((loggedIn) => {
      if (loggedIn){
        this.router.navigate(['inventory']);
      }
    })
  }

  loginWithRedirect(): void{
    this.auth.loginWithRedirect();
  }

}
