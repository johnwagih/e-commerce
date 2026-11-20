import { CurrencyPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { OrdersServiceService } from '../../core/services/OrdersService/orders-service.service';
import { IAllOrders } from '../../modules/iorder-subcategory.interface';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllOrdersComponent implements OnInit {

  private readonly ordersService = inject(OrdersServiceService);
  private readonly platformId = inject(PLATFORM_ID);

  allOrders: WritableSignal<IAllOrders[]> = signal([]);

  isLoading: WritableSignal<boolean> = signal(true);

  hasError: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getAllOrders();
    }
  }

  getAllOrders(): void {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      this.isLoading.set(false);
      this.hasError.set(true);
      return;
    }

    this.isLoading.set(true);
    this.hasError.set(false);

    this.ordersService.getUserOrders(userId).subscribe({
      next: (res) => {
        this.allOrders.set(res);
        this.isLoading.set(false);
      },

      error: (err) => {
        console.error(err);
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }

  getTotalItems(order: IAllOrders): number {
    return order.cartItems.reduce((total, item) => total + item.count, 0);
  }

}