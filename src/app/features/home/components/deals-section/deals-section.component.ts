import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-deals-section',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './deals-section.component.html',
  styleUrl: './deals-section.component.css',
})
export class DealsSectionComponent {}
