import { Component, OnInit } from '@angular/core';


import { AudioRecordingService } from '../../../shared/services/audio-recording-service/audio-recording.service';
import { DomSanitizer } from "@angular/platform-browser";
import { NgIf } from '@angular/common';


import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { InventoryService } from '../../../shared/services/inventory-service/inventory.service';

import { Router } from '@angular/router';
import { TopbarConfigurationService } from '../../../shared/services/topbar-configuration-service/topbar-configuration.service';
import { FooterVisibilityService } from '../../../shared/services/footer-visibility-service/footer-visibility.service';


@Component({
  selector: 'app-upload-audio',
  standalone: true,
  imports: [NgIf, NzButtonModule, NzSpinModule],
  templateUrl: './upload-audio.component.html',
  styleUrl: './upload-audio.component.scss'
})
export class UploadAudioComponent implements OnInit {

  isRecording = false;
  recordedTime: any;
  blobUrl: any;
  teste: any;
  currentIntervalId: any;
  isAnalyzing: boolean = false;

  constructor(
    private audioRecordingService: AudioRecordingService,
    private sanitizer: DomSanitizer,
    private inventoryService: InventoryService,
    private router: Router,
    private topbarConfigurationService: TopbarConfigurationService,
    private footerVisibilityService: FooterVisibilityService

  ) {
    this.audioRecordingService
      .recordingFailed()
      .subscribe(() => (this.isRecording = false));
    this.audioRecordingService
      .getRecordedTime()
      .subscribe(time => (this.recordedTime = time));
    this.audioRecordingService.getRecordedBlob().subscribe(data => {
      this.teste = data;
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(data.blob)
      );
    });
  }
  ngOnInit(): void {
    this.topbarConfigurationService.show();
    this.topbarConfigurationService.changeTitle('Audio');
    this.topbarConfigurationService.changeHistoryButtonVisibility(false);
    this.topbarConfigurationService.changeBackButtonVisibility(true);
    this.topbarConfigurationService.changeConfigButtonVisibility(false);

    this.footerVisibilityService.show();
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

  async send() {
    this.isAnalyzing = true;
    let audioBlob: any = this.teste.blob;
    audioBlob.name = "audio.mp3";
    audioBlob.lastModified = new Date();

    let audioFile: File = new File([audioBlob], audioBlob.name, { type: audioBlob.type });

    this.inventoryService.postAudio(audioFile).subscribe((res: number) => {
      let trackingId: number = res;
      this.router.navigate(['/create'], { queryParams: { id: trackingId } });
    });

  }
}
