import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category, product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  constructor(
    private _EcomDataService: EcomDataService,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService
  ) {}
  // categories: product = {} as product;
  categories: any[] = [];
  ngOnInit(): void {
    // Get Categories
    this._EcomDataService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
    });
  }
}
