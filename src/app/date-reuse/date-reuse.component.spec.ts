import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateReuseComponent } from './date-reuse.component';

describe('DateReuseComponent', () => {
  let component: DateReuseComponent;
  let fixture: ComponentFixture<DateReuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateReuseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DateReuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
