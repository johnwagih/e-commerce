import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { CartServiceService } from '../../core/services/cartServices/cart-service.service';
import { isPlatformBrowser } from '@angular/common';
import { AuthServiceService } from '../../core/services/authService/auth-service.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive, RouterLinkWithHref],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly cartServiceService = inject(CartServiceService)
  private readonly authServiceService = inject(AuthServiceService)
  private readonly platformId = inject(PLATFORM_ID)
  private readonly router = inject(Router)

  cartCounter = computed(() => this.cartServiceService.cartCounter())

  isLogged = computed(()=>this.authServiceService.isLogged())
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getLoggedUserCart()
      if (localStorage.getItem(`tokenUser`)) {
        this.authServiceService.isLogged.set(true)
      }
      else{
        this.authServiceService.isLogged.set(false)

      }
    }
  }
  // getLoggedUserCart
  getLoggedUserCart() {
    this.cartServiceService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartServiceService.cartCounter.set(res.numOfCartItems)
      },
      error: (err) => {
        console.log(err)
      }
    });
  }


  signOut() {
    localStorage.removeItem('tokenUser');
    localStorage.removeItem('dataUser');
    localStorage.removeItem('userId');
    this.authServiceService.isLogged.set(false);
    this.router.navigate([`/sign-in`])

  }
}
