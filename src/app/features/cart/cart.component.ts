import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartServiceService } from '../../core/services/cartServices/cart-service.service';
import { sign } from 'node:crypto';
import { Icart } from '../../modules/icart.interface';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  // injectiones
  private readonly toaster = inject(ToastrService)
  private readonly cartServiceService = inject(CartServiceService)
  private readonly platformId = inject(PLATFORM_ID)
  // properites
  cartProductsList: WritableSignal<Icart | null> = signal(null)
  // ngOnInit
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getLoggedUserCart()
    }
  }

  // getLoggedUserCart
  getLoggedUserCart() {
    this.cartServiceService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartProductsList.set(res.data)
        this.cartServiceService.cartCounter.set(res.numOfCartItems)
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  // updateCartQuantity
  updateCartQuantity(productId: string, count: number) {
    this.cartServiceService.updateCartQuantity(productId, count).subscribe({
      next: (res) => {
        this.cartProductsList.set(res.data)
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  // removeCart
  removeCart(productId: any) {
    this.cartServiceService.removeCart(productId).subscribe({
      next: (res) => {
        console.log(res)
        this.toaster.success(res.message, "", {
          progressBar: true
        })
        this.cartServiceService.cartCounter.set(res.numOfCartItems)
        this.cartProductsList.set(res.data)
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  // clearCart
  clearCart() {
    this.cartServiceService.clearCart().subscribe({
      next: (res) => {
        this.toaster.success(res.message, "", {
          progressBar: true
        })
        this.cartProductsList.set(res.data)
        this.cartServiceService.cartCounter.set(res.numOfCartItems)
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

}
