import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../shared/services/wishlist.service';
import { product } from '../../shared/interfaces/product';
import { CartService } from '../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  constructor(
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}
  products: product[] = [];
  wishListData: string[] = [];
  ngOnInit(): void {
    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        this.products = response.data;
        // WishList
        const newData = response.data.map((item: any) => item._id);
        this.wishListData = newData;
        this._WishlistService.favNumb.next(response.data.length);
      },
    });
  }

  // Add To Cart
  addCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);
        this._CartService.cartNumb.next(response.numOfCartItems);
      },
      error: (err) => {
        this._ToastrService.error(err.message);
      },
    });
  }

  //  WishList
  addFav(id: string | undefined): void {
    this._WishlistService.addToWishList(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);
        this.wishListData = response.data;
        this._WishlistService.favNumb.next(response.data.length);
      },
      error: (err) => {
        this._ToastrService.error(err.message);
      },
    });
  }

  removeFav(productId: string | undefined): void {
    this._WishlistService.removeItem(productId).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);
        this.wishListData = response.data;
        const newProduct = this.products.filter((item: any) =>
          this.wishListData.includes(item._id)
        );
        this.products = newProduct;
        this._WishlistService.favNumb.next(response.data.length);

        // Another Way
        // this._WishlistService.getWishList().subscribe({
        //   next: (response) => {
        //     this.products = response.data;
        //   },
        // });
      },
      error: (err) => {
        this._ToastrService.error(err.message);
      },
    });
  }
}
