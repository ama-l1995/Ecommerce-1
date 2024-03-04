import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService,
    private _EcomDataService: EcomDataService,
    private _ToastrService: ToastrService
  ) {}
  productDetails: product = {} as product;
  detailsSliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    items: 1,
    nav: false,
  };
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let idProduct: any = params.get('id');
        this._EcomDataService.getProductDetails(idProduct).subscribe({
          next: (response) => {
            this.productDetails = response.data;
          },
        });
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
        this._ToastrService.success(err.message);
      },
    });
  }
}
