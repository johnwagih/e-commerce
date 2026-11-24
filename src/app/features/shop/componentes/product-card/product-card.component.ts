import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { Iproduct } from './../../../../modules/iproduct.interface';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../../core/services/productService/products.service';
import { RouterLink } from '@angular/router';
import { CartServiceService } from '../../../../core/services/cartServices/cart-service.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistServiceService } from '../../../../core/services/wishlistService/wishlist-service.service';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-product-card',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  // injects
  private readonly productsService = inject(ProductsService)
  private readonly cartServiceService = inject(CartServiceService)
  private readonly toaster = inject(ToastrService)
  private readonly wishlistServiceService = inject(WishlistServiceService)
  private readonly platformId = inject(PLATFORM_ID)
  // properties
  listProducts: WritableSignal<Iproduct[]> = signal([]);
  // ngOnInit
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getAllProudct()
    }
  }
  // getAllProudct
  getAllProudct() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.listProducts.set(res.data)
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
