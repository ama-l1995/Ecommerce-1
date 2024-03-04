import { Component } from '@angular/core';
import { product } from 'src/app/shared/interfaces/product';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent {
  constructor(private _EcomDataService: EcomDataService) {}
  brands: any[] = [];

  categories: any[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this._EcomDataService.getBrands().subscribe({
      next: (response) => {
        this.brands = response.data;
      },
    });
  }
}
