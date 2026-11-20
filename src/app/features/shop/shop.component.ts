import { Component, inject, OnInit } from '@angular/core';
import { ShopHeaderComponent } from './componentes/shop-header/shop-header.component';
import { ProductCardComponent } from './componentes/product-card/product-card.component';

@Component({
  selector: 'app-shop',
  imports: [ShopHeaderComponent, ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {}
