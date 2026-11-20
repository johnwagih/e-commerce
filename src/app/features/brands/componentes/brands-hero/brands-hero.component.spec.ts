import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsHeroComponent } from './brands-hero.component';

describe('BrandsHeroComponent', () => {
  let component: BrandsHeroComponent;
  let fixture: ComponentFixture<BrandsHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsHeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandsHeroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
