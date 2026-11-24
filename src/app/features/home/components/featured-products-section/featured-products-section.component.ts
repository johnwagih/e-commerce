import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WishlistServiceService } from '../../../../core/services/wishlistService/wishlist-service.service';
import { ToastrService } from 'ngx-toastr';
import { CartServiceService } from '../../../../core/services/cartServices/cart-service.service';

@Component({
  selector: 'app-featured-products-section',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './featured-products-section.component.html',
  styleUrl: './featured-products-section.component.css',
})
export class FeaturedProductsSectionComponent {
    private readonly cartServiceService = inject(CartServiceService)
  private readonly toaster = inject(ToastrService)
  private readonly wishlistServiceService = inject(WishlistServiceService)




  // addToCart
  addToCart(productId: any) {
    this.cartServiceService.addToCart(productId).subscribe({
      next: (res) => {
        // console.log(res)
        this.toaster.success(res.message, "", {
          progressBar: true
        })
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
