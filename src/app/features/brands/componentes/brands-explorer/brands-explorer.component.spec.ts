import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsExplorerComponent } from './brands-explorer.component';

describe('BrandsExplorerComponent', () => {
  let component: BrandsExplorerComponent;
  let fixture: ComponentFixture<BrandsExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsExplorerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandsExplorerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
