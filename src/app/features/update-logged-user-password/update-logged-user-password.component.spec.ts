import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLoggedUserPasswordComponent } from './update-logged-user-password.component';

describe('UpdateLoggedUserPasswordComponent', () => {
  let component: UpdateLoggedUserPasswordComponent;
  let fixture: ComponentFixture<UpdateLoggedUserPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateLoggedUserPasswordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateLoggedUserPasswordComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
