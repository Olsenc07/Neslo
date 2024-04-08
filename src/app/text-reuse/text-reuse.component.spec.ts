import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextReuseComponent } from './text-reuse.component';

describe('TextReuseComponent', () => {
  let component: TextReuseComponent;
  let fixture: ComponentFixture<TextReuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextReuseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextReuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
