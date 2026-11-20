import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialBrandComponent } from './special-brand.component';

describe('SpecialBrandComponent', () => {
  let component: SpecialBrandComponent;
  let fixture: ComponentFixture<SpecialBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialBrandComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialBrandComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
