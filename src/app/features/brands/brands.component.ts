import { Component } from '@angular/core';
import { BrandsExplorerComponent } from './componentes/brands-explorer/brands-explorer.component';
import { BrandsHeroComponent } from './componentes/brands-hero/brands-hero.component';

@Component({
  selector: 'app-brands',
  imports: [BrandsExplorerComponent, BrandsHeroComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {}
