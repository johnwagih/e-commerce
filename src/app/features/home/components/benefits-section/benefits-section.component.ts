import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { Component } from '@angular/core';

@Component({
  selector: 'app-benefits-section',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './benefits-section.component.html',
  styleUrl: './benefits-section.component.css',
})
export class BenefitsSectionComponent {}
