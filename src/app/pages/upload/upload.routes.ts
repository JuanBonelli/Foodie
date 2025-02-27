import { Routes } from '@angular/router';
import { UploadAudioComponent } from './upload-audio/upload-audio.component';
import { UploadComponent } from './upload-main/upload-main.component';



export const UPLOAD_ROUTES: Routes = [
  {
    path: '',
    component: UploadComponent,
  },
  {
    path: 'audio',
    component: UploadAudioComponent,
  }
];

