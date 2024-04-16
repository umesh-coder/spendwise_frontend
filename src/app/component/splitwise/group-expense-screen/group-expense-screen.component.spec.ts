import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupExpenseScreenComponent } from './group-expense-screen.component';

describe('GroupExpenseScreenComponent', () => {
  let component: GroupExpenseScreenComponent;
  let fixture: ComponentFixture<GroupExpenseScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupExpenseScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupExpenseScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
