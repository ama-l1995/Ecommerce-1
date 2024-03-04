import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomDataService } from '../shared/services/ecom-data.service';
import { product } from '../shared/interfaces/product';

@Component({
  selector: 'app-catdetails',
  templateUrl: './catdetails.component.html',
  styleUrls: ['./catdetails.component.css'],
})
export class CatdetailsComponent {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _EcomDataService: EcomDataService
  ) {}
  catDetails: any[] = [];
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let idCat: any = params.get('id');
        this._EcomDataService.getCatDetails(idCat).subscribe({
          next: (response) => {
            this.catDetails = response.data;
          },
        });
      },
    });
  }
}
