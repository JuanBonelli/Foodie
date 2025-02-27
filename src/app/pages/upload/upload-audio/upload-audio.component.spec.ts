import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductUploadAudioComponent } from './upload-audio.component';



describe('ProductUploadAudioComponent', () => {
  let component: ProductUploadAudioComponent;
  let fixture: ComponentFixture<ProductUploadAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductUploadAudioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductUploadAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
