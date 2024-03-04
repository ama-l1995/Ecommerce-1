import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private _CartService: CartService) {}
  cartDetails: any = {};
  totalCartPrice: number = 0;

  changeCount(num: number, count: number, id: string): void {
    const newCount = count + num;
    if (newCount > 0) {
      this._CartService.updateCount(id, newCount).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.cartDetails = response.data;
            this.totalCartPrice = response.data.totalCartPrice;
          }
        },
      });
    }
  }

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        console.log(response.data);
        this.cartDetails = response.data;
      },
    });
  }

  removeProduct(id: string): void {
    this._CartService.removeItem(id).subscribe({
      next: (response) => {
        this.cartDetails = response.data;
        this._CartService.cartNumb.next(response.numOfCartItems);
      },
    });
  }

  clearCart(): void {
    this._CartService.clearCart().subscribe({
      next: (response) => {
        if (response.message === 'success') {
          this.cartDetails = [];
          this._CartService.cartNumb.next(0);
        }
      },
    });
  }
}
