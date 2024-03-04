import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private _EcomDataService: EcomDataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService
  ) {}
  products: product[] = [];
  searchTerm: string = '';
  wishListData: string[] = [];
  ngOnInit(): void {
    // Get All Products
    this._EcomDataService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
    });

    // WishList
    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        this.wishListData = response.data;
        const newData = response.data.map((item: any) => item._id);
        this.wishListData = newData;
        this._WishlistService.favNumb.next(response.data.length);
      },
    });
  }

  // Add To WishList
  addFav(id: string | undefined): void {
    this._WishlistService.addToWishList(id).subscribe({
      next: (response) => {
        this._WishlistService.favNumb.next(response.data.length);
        this._ToastrService.success(response.message);
        this.wishListData = response.data;
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
        this._WishlistService.favNumb.next(response.data.length);
      },
      error: (err) => {
        this._ToastrService.error(err.message);
      },
    });
  }

  // Add To Cart
  addCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._CartService.cartNumb.next(response.numOfCartItems);
        this._ToastrService.success(response.message);
      },
      error: (err) => {
        this._ToastrService.error(err.message);
      },
    });
  }
}
