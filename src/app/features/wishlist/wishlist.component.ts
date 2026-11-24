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
  ngOnInit(): void {
    this.Getloggeduserwishlist()
  }
  // Getloggeduserwishlist
  Getloggeduserwishlist() {
    this.wishlistServiceService.Getloggeduserwishlist().subscribe({
      next: (res) => {
        console.log(res)
        this.wishlistList.set(res)
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  // removeProductFromWishlist
  removeProductFromWishlist(productId: string) {
    this.wishlistServiceService.removeProductFromWishlist(productId).subscribe({
      next: (res) => {
        console.log(res)
        // this.wishlistList.set(res)
        this.Getloggeduserwishlist()
      },
      error: (err) => {
        console.log(err)
      }
    });
  }


}
