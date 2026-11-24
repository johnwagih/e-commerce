import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { Component } from '@angular/core';

@Component({
  selector: 'app-newsletter-section',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './newsletter-section.component.html',
  styleUrl: './newsletter-section.component.css',
})
export class NewsletterSectionComponent {}
