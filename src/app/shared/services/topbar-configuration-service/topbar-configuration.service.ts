import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TopbarConfigurationService {
  public onVisibilityChange: EventEmitter<Boolean>;
  public onTitleChange: EventEmitter<string>;
  public onConfigButtonChange: EventEmitter<boolean>;
  public onHistoryButtonChange: EventEmitter<boolean>;
  public onBackButtonChange: EventEmitter<boolean>;
  public onHistoryRouteChange: EventEmitter<string>;

  constructor() {
    this.onVisibilityChange = new EventEmitter();
    this.onTitleChange = new EventEmitter();
    this.onConfigButtonChange = new EventEmitter();
    this.onHistoryButtonChange = new EventEmitter();
    this.onBackButtonChange = new EventEmitter();
    this.onHistoryRouteChange = new EventEmitter();
  }

  changeTitle(title: string): void {
    this.onTitleChange.emit(title);
  }
  
  changeHistoryRedirection(path: string): void {
    this.onHistoryRouteChange.emit(path);
  }
  
  changeConfigButtonVisibility(hasToBeDisplayed: boolean): void {
    this.onConfigButtonChange.emit(hasToBeDisplayed);
  }

  changeHistoryButtonVisibility(hasToBeDisplayed: boolean): void {
    this.onHistoryButtonChange.emit(hasToBeDisplayed);
  }

  changeBackButtonVisibility(hasToBeDisplayed: boolean): void {
    this.onBackButtonChange.emit(hasToBeDisplayed);
  }

  hide(): void {
    this.onVisibilityChange.emit(false);
  }

  show(): void {
    this.onVisibilityChange.emit(true);
  }
}
