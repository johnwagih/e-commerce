import { Component } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { BenefitsSectionComponent } from './components/benefits-section/benefits-section.component';
import { CategoriesSectionComponent } from './components/categories-section/categories-section.component';
import { FeaturedProductsSectionComponent } from './components/featured-products-section/featured-products-section.component';
import { NewsletterSectionComponent } from './components/newsletter-section/newsletter-section.component';
import { EditorialSectionComponent } from './components/editorial-section/editorial-section.component';
import { DealsSectionComponent } from './components/deals-section/deals-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroSectionComponent, BenefitsSectionComponent, CategoriesSectionComponent, DealsSectionComponent, FeaturedProductsSectionComponent, NewsletterSectionComponent, EditorialSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
