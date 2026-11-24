import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { CategoriesServiceService } from './../../core/services/categoriesService/categories-service.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesSectionComponent } from '../home/components/categories-section/categories-section.component';
import { Icategory } from '../../modules/icategory.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesServiceService = inject(CategoriesServiceService)

  categoriesList: WritableSignal<Icategory> = signal({} as Icategory)

  ngOnInit(): void {
    this.GetAllCategories()
  }

  // GetAllCategories
  GetAllCategories() {
    this.categoriesServiceService.GetAllCategories().subscribe({
      next: (res) => {
        console.log(res)
        this.categoriesList.set(res)
      },
      error: (err) => {
        console.log(err)
      }
    });
  }


  
}
