import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IBrands } from '../../../../modules/ibrands.interface';
import { BrandsService } from '../../../../core/services/brabdService/brands.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-brands-explorer',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './brands-explorer.component.html',
  styleUrl: './brands-explorer.component.css'
})
export class BrandsExplorerComponent implements OnInit {
  isLoading: WritableSignal<boolean> = signal(true);
  hasError: WritableSignal<boolean> = signal(false);
  private readonly platformId = inject(PLATFORM_ID)
  private readonly brandsService = inject(BrandsService);
  listBrands: WritableSignal<IBrands[]> = signal([]);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getAllBrands();

    }
  }

  getAllBrands(): void {
    this.isLoading.set(true);
    this.hasError.set(false);

    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.listBrands.set(res.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }



}
