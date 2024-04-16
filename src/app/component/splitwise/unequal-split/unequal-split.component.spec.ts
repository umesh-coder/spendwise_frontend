import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnequalSplitComponent } from './unequal-split.component';

describe('UnequalSplitComponent', () => {
  let component: UnequalSplitComponent;
  let fixture: ComponentFixture<UnequalSplitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnequalSplitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnequalSplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
