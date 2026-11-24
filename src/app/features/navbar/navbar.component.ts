import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { CartServiceService } from '../../core/services/cartServices/cart-service.service';
import { isPlatformBrowser } from '@angular/common';
import { AuthServiceService } from '../../core/services/authService/auth-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ProductsService } from '../../core/services/productService/products.service';
import { of } from 'rxjs';
import { Iproduct } from '../../modules/iproduct.interface';
import { TranslationService } from '../../core/i18n/translation.service';
import { ThemeService } from '../../core/theme/theme.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive, RouterLinkWithHref, ReactiveFormsModule, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly cartServiceService = inject(CartServiceService)
  private readonly authServiceService = inject(AuthServiceService)
  private readonly productsService = inject(ProductsService)
  private readonly platformId = inject(PLATFORM_ID)
  private readonly router = inject(Router)
  readonly translations = inject(TranslationService)
  readonly theme = inject(ThemeService)

  toggleLanguage(): void {
    this.translations.toggleLanguage();
  }

  toggleTheme(): void {
    this.theme.toggle();
  }

  cartCounter = computed(() => this.cartServiceService.cartCounter())

  isLogged = computed(() => this.authServiceService.isLogged())
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getLoggedUserCart()
      if (localStorage.getItem(`tokenUser`)) {
        this.authServiceService.isLogged.set(true)
      }
      else {
        this.authServiceService.isLogged.set(false)
      }
      // this.searchProducts();
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

  // signOut
  signOut() {
    localStorage.removeItem('tokenUser');
    localStorage.removeItem('dataUser');
    localStorage.removeItem('userId');
    this.authServiceService.isLogged.set(false);
    this.router.navigate([`/sign-in`])

  }

  // searchResults = signal<Iproduct[]>([]);
  // searchControl = new FormControl('');
  // searchProducts
  // searchProducts() {
  //   this.searchControl.valueChanges.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),
  //     switchMap((value) => {
  //       if (value!.trim()) {
  //         return this.productsService.searchProducts(value!);
  //       }
  //       return of({ data: [] });
  //     })
  //   ).subscribe({
  //     next: (res) => {
  //       console.log(res)
  //       this.searchResults.set(res.data)
  //       console.log(this.searchResults());
  //       console.log('API Response:', res);
  //       console.log('Products:', res.data);
  //     },
  //     error: (err) => {
  //       console.log(err)
  //     }
  //   });;
  // }
}
