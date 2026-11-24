import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brabdService/brands.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IspecialBrand } from '../../modules/ispecial-brand.interface';
import { ProductsService } from '../../core/services/productService/products.service';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { CartServiceService } from '../../core/services/cartServices/cart-service.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistServiceService } from '../../core/services/wishlistService/wishlist-service.service';
import { Iproduct } from '../../modules/iproduct.interface';

@Component({
  selector: 'app-special-brand',
  imports: [CurrencyPipe, RouterLink, TranslatePipe],
  templateUrl: './special-brand.component.html',
  styleUrl: './special-brand.component.css',
})
export class SpecialBrandComponent implements OnInit {
  // injects
  private readonly brandsService = inject(BrandsService)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  private readonly paltformId = inject(PLATFORM_ID)
  private readonly cartServiceService = inject(CartServiceService)
  private readonly toaster = inject(ToastrService)
  private readonly wishlistServiceService = inject(WishlistServiceService)
  // properties
  listProducts: WritableSignal<Iproduct[]> = signal([]);
specialBrandList: WritableSignal<IspecialBrand[]> = signal([]);  ngOnInit(): void {
    //  this.specialBrand() unues
    if (isPlatformBrowser(this.paltformId)) {
      this.getSpecificBrand()
    }
  }

  brandId = signal("")
  // specialBrand unues
  // specialBrand() {
  //   this.activatedRoute.paramMap.subscribe((param)=>{
  //     this.brandId.set(param.get("id")!)
  //   })
  //   this.brandsService.specialBrand(this.brandId()).subscribe({
  //    next: (res) => {
  //    console.log( `old`, res)
  //    this.specialBrandList.set(res)
  //    },
  //    error: (err) => {
  //    console.log(err)
  //    }
  //   });
  // }



  

// getSpecificBrand


getSpecificBrand() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.brandId.set(param.get("id")!)
    })
    this.productsService.getSpecificBrand(this.brandId()).subscribe({
      next: (res) => {
        console.log(`new`, res)
        this.specialBrandList.set(res.data)
        console.log(this.specialBrandList());
      },
      error: (err) => {
        console.log(err)
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
