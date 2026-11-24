import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands-hero',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './brands-hero.component.html',
  styleUrl: './brands-hero.component.css',
})
export class BrandsHeroComponent {}
