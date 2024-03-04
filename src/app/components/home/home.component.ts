import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _EcomDataService: EcomDataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService
  ) {}
  products: product[] = [];
  categories: any[] = [];
  wishListData: string[] = [];
  searchTerm: string = '';
  // Add To Cart
  addCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._CartService.cartNumb.next(response.numOfCartItems);
        this._ToastrService.success(response.message);
      },
      error: (err) => {
        this._ToastrService.success(err.message);
      },
    });
  }

  //  WishList
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

  categoriesSliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };

  mainSliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    items: 1,
    nav: false,
  };
  ngOnInit(): void {
    // Get All Products
    this._EcomDataService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
    });
    // Get Categories
    this._EcomDataService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
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
}
