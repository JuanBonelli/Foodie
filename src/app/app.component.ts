import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { UserService } from './shared/services/user-service/user.service';
import { NgIf } from '@angular/common';
import { DishService } from './shared/services/dish-service/dish.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent, FooterComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Foodiecare';

  constructor(private userService: UserService, private router: Router, private dishService: DishService) {}

  ngOnInit(): void {
    this.getLocalStream();
    this.userService.userLoading.subscribe((loading: boolean) => {
      if (!loading) {
        this.redirectToQuestionnaire();
      }
    });

    this.dishService.loadCurrentDishes();
  }

  getLocalStream(): void {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((mediaStream) => {
        let window: any;
        window.localStream = mediaStream;
        window.localAudio.srcObject = mediaStream;
        window.localAudio.autoplay = true;
      })
      .catch((err) => {
        console.error(`you got an error: ${err}`);
      });
  }

  redirectToQuestionnaire() {
    this.router.navigateByUrl('/questionnaire');
  }


}
