import { ProductsService } from './../../core/services/productService/products.service';
import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, OnInit, PLATFORM_ID, signal, ViewChild, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { __param } from 'tslib';
import { Iproduct } from '../../modules/iproduct.interface';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartServiceService } from '../../core/services/cartServices/cart-service.service';
import { Icart } from '../../modules/icart.interface';
import { WishlistServiceService } from '../../core/services/wishlistService/wishlist-service.service';
import { platformBrowser } from '@angular/platform-browser';
@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    ngSkipHydration: 'true'
  }
})
export class ProductDetailsComponent implements OnInit {

  @ViewChild('mainSwiper') mainSwiper!: ElementRef;
  @ViewChild('thumbsSwiper') thumbsSwiper!: ElementRef;

  // injection
  private readonly cartServiceService = inject(CartServiceService)
  private readonly toaster = inject(ToastrService)
  private readonly ProductsService = inject(ProductsService)
  private readonly activatedRoute = inject(ActivatedRoute)
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private readonly wishlistServiceService = inject(WishlistServiceService)


  // properties
  productesList: WritableSignal<Iproduct> = signal({} as Iproduct)
  idUrl = signal("")
  cartProductsList: WritableSignal<Icart | null> = signal(null)

  // ngOnInit
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getSpecificProduct()
    }



  }

  // getSpecificProduct
  getSpecificProduct() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.idUrl.set(param.get('id')!);
      this.ProductsService.getSpecificProduct(this.idUrl()).subscribe({
        next: async (res) => {
          console.log(res)
          this.productesList.set(res.data);
          // Browser only
          if (isPlatformBrowser(this.platformId)) {
            const { register } = await import('swiper/element/bundle');
            register();
            this.cdr.detectChanges();
            this.thumbsSwiper.nativeElement.initialize();
            this.mainSwiper.nativeElement.initialize();
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
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
