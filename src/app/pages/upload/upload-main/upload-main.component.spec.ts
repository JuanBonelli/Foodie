import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductUploadListComponent } from './upload-main.component';


describe('ProductUploadListComponent', () => {
  let component: ProductUploadListComponent;
  let fixture: ComponentFixture<ProductUploadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductUploadListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductUploadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
