import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FooterVisibilityService {
  public onGenerateRecipeButtonVisibilityChange: EventEmitter<boolean>;
  public onVisibilityChange: EventEmitter<Boolean>;

  constructor() {
    this.onGenerateRecipeButtonVisibilityChange = new EventEmitter();
    this.onVisibilityChange = new EventEmitter();
  }

  public hideGenerateRecipeButton(): void {
    this.onGenerateRecipeButtonVisibilityChange.emit(false);
  }

  public showGenerateRecipeButton(): void {
    this.onGenerateRecipeButtonVisibilityChange.emit(true);
  }

  hide(): void {
    this.onVisibilityChange.emit(false);
  }

  show(): void {
    this.onVisibilityChange.emit(true);
  }
}
