import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { CategoriesSectionComponent } from '../home/components/categories-section/categories-section.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesServiceService } from '../../core/services/categoriesService/categories-service.service';
import { ISpecificCategory } from '../../modules/i-specific-category.interface';
import { isPlatformBrowser } from '@angular/common';
import { ProductsService } from '../../core/services/productService/products.service';
import { switchMap } from 'rxjs';
import { WishlistServiceService } from '../../core/services/wishlistService/wishlist-service.service';
import { ToastrService } from 'ngx-toastr';
import { CartServiceService } from '../../core/services/cartServices/cart-service.service';

@Component({
  selector: 'app-special-categories',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './special-categories.component.html',
  styleUrl: './special-categories.component.css',
})
export class SpecialCategoriesComponent implements OnInit {

  private readonly categoriesServiceService = inject(CategoriesServiceService)
  private readonly ProductsService = inject(ProductsService)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly platformId = inject(PLATFORM_ID)
    private readonly cartServiceService = inject(CartServiceService)
  private readonly toaster = inject(ToastrService)
  private readonly wishlistServiceService = inject(WishlistServiceService)

SpecificCategory: WritableSignal<ISpecificCategory[]> = signal([]);

  categoryId = signal("")

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // this.GetSpecificCategory()
      this.getSpecificCategory()
    }
  }

  // GetSpecificCategory unuse
  // GetSpecificCategory(){
  //   this.activatedRoute.paramMap.subscribe((param)=>{
  //     this.categoryId.set(param.get(`id`)!)
  //   })
  //   this.categoriesServiceService.GetSpecificCategory(this.categoryId()).subscribe({
  //    next: (res) => {
  //    console.log(res)
  //    this.SpecificCategory.set(res)
  //    },
  //    error: (err) => {
  //    console.log(err)
  //    }
  //   });
  // }

// getSpecificCategory
getSpecificCategory() {
  this.activatedRoute.paramMap.pipe(
    switchMap((param) => {
      this.categoryId.set(param.get('id')!);

      return this.ProductsService.getSpecificCategory(this.categoryId());
    })
  ).subscribe({
    next: (res) => {
      console.log(res);
      this.SpecificCategory.set(res.data);
    },
    error: (err) => {
      console.log(err);
    }
  });
}




  // addToCart
  addToCart(productId: any) {
    this.cartServiceService.addToCart(productId).subscribe({
      next: (res) => {
        // console.log(res)
        this.toaster.success(res.message, "", {
          progressBar: true
        })
        this.cartServiceService.cartCounter.set(res.numOfCartItems)
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
  // addWishlist
  addWishlist(productId: string) {
    this.wishlistServiceService.addWishlist(productId).subscribe({
      next: (res) => {
        console.log(res)
        this.toaster.success(res.message, "", {
          progressBar: true
        })
      },
      error: (err) => {
        console.log(err)
      }
    });

  }


}
