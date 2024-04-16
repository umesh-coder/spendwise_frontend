import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EqualSplitComponent } from './equal-split.component';

describe('EqualSplitComponent', () => {
  let component: EqualSplitComponent;
  let fixture: ComponentFixture<EqualSplitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EqualSplitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EqualSplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
