import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-shop-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './shop-header.component.html',
  styleUrl: './shop-header.component.css'
})
export class ShopHeaderComponent {}