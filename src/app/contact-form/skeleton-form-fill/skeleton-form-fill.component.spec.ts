import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonFormFillComponent } from './skeleton-form-fill.component';

describe('SkeletonFormFillComponent', () => {
  let component: SkeletonFormFillComponent;
  let fixture: ComponentFixture<SkeletonFormFillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonFormFillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkeletonFormFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
