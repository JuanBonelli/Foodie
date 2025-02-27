import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { NgIf } from '@angular/common';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent {
  constructor(public auth: AuthService) {}
}
