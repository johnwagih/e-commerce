import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { PayService } from '../../core/services/payService/pay.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartServiceService } from '../../core/services/cartServices/cart-service.service';

@Component({
  selector: 'app-pay',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, RouterLink],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css',
})
export class PayComponent {

  private readonly fb = inject(FormBuilder)
  private readonly payService = inject(PayService)
  private readonly toastr = inject(ToastrService)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly cartServiceService = inject(CartServiceService)
  private readonly router = inject(Router)

  cartId = signal("")

  checkoutForm: FormGroup = this.fb.group({
    details: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500),
      Validators.pattern(/^(?=.*[\u0600-\u06FFa-zA-Z])[ \u0600-\u06FFa-zA-Z0-9,.\-/#]+$/)
    ]],
    phone: ['', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ],
    ],
    city: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ],
    ],
  });

  // chechoutCash
  chechoutCash() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.cartId.set(param.get('id')!)
    })
    let paylod = {
      shippingAddress: this.checkoutForm.value
    }
    if (this.checkoutForm.valid) {
      this.payService.chechoutCash(paylod, this.cartId()).subscribe({
        next: (res) => {
          console.log(res)
          this.toastr.success('Your order has been placed successfully. You can pay in cash when your order arrives.', `Order Placed Successfully! 🎉`, {
            progressBar: true
          })
          this.router.navigate([`allorders`])
          this.cartServiceService.cartCounter.set(res.numOfCartItems)
        },
        error: (err) => {
          console.log(err)
        }
      });
    }
    else {
      this.checkoutForm.markAllAsTouched()
    }
  }



  // chechoutVisa
  chechoutVisa() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.cartId.set(param.get('id')!)
    })
    let paylod = {
      shippingAddress: this.checkoutForm.value
    }
    if (this.checkoutForm.valid) {
      this.payService.chechoutVisa(paylod, this.cartId()).subscribe({
        next: (res) => {
          console.log(res)
          this.toastr.success(res.status, "The Pay", {
            progressBar: true
          })
          window.open(res.session.url, `_blank`)
          this.cartServiceService.cartCounter.set(res.numOfCartItems)
        },
        error: (err) => {
          console.log(err)
        }
      });
    }
    else {
      this.checkoutForm.markAllAsTouched()
    }
  }

}
