import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-editorial-section',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './editorial-section.component.html',
  styleUrl: './editorial-section.component.css',
})
export class EditorialSectionComponent {}
