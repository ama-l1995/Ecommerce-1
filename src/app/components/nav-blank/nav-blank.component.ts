import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/app/shared/interfaces/product';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css'],
})
export class NavBlankComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _WishlistService: WishlistService,
    private _CartService: CartService
  ) {}
  products: product[] = [];
  wishListData: string[] = [];
  whishItemNumb: number = 0;
  cartCount: number = 0;
  favCount: number = 0;
  cartDetails: any = {};

  ngOnInit(): void {
    // Wish List
    if (!this._Router.url.includes('whishlist')) {
      this._WishlistService.getWishList().subscribe({
        next: (response) => {},
      });
    }

    this._WishlistService.favNumb.subscribe({
      next: (data) => {
        this.favCount = data;
      },
    });

    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        this.products = response.data;
        // WishList
        const newData = response.data.map((item: any) => item._id);
        this.wishListData = newData;
        // this._WishlistService.whishNumb.next(response.data.length);
        this._WishlistService.favNumb.next(response.data.length);
        console.log(response.data.length);
      },
    });

    if (!this._Router.url.includes('cart')) {
      this._CartService.getUserCart().subscribe({
        next: (response) => {},
      });
    }

    this._CartService.cartNumb.subscribe({
      next: (data) => {
        this.cartCount = data;
      },
    });

    this._CartService.getUserCart().subscribe({
      next: (response) => {
        console.log(response.data);
        this.cartDetails = response.data;

        this._CartService.cartNumb.next(response.numOfCartItems);
        console.log(response.numOfCartItems);
      },
    });
  }

  logOutuser(): void {
    this._AuthService.logOut();
  }
}
