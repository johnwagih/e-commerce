import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialCategoriesComponent } from './special-categories.component';

describe('SpecialCategoriesComponent', () => {
  let component: SpecialCategoriesComponent;
  let fixture: ComponentFixture<SpecialCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialCategoriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialCategoriesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
