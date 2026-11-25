import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WishlistServiceService } from '../../core/services/wishlistService/wishlist-service.service';
import { Iwishlist } from '../../modules/iwishlist.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-wishlist',
  imports: [DecimalPipe, RouterLink, TranslatePipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly toaster = inject(ToastrService)
  private readonly wishlistServiceService = inject(WishlistServiceService)
  wishlistList: WritableSignal<Iwishlist | null> = signal(null)
  isLoading = signal(true)
  hasError = signal(false)

  ngOnInit(): void {
    this.Getloggeduserwishlist()
  }
  // Getloggeduserwishlist
  Getloggeduserwishlist() {
    this.isLoading.set(true)
    this.hasError.set(false)
    this.wishlistServiceService.Getloggeduserwishlist().subscribe({
      next: (res) => {
        this.wishlistList.set(res)
        this.isLoading.set(false)
      },
      error: () => {
        this.hasError.set(true)
        this.wishlistList.set({ status: 'error', count: 0, data: [] } as Iwishlist)
        this.isLoading.set(false)
      }
    });
  }

  // removeProductFromWishlist
  removeProductFromWishlist(productId: string) {
    this.wishlistServiceService.removeProductFromWishlist(productId).subscribe({
      next: (res) => {
        this.Getloggeduserwishlist()
      },
      error: () => {
        this.toaster.error('Could not remove this product. Please try again.')
      }
    });
  }


}
