import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-bran-details',
  templateUrl: './bran-details.component.html',
  styleUrls: ['./bran-details.component.css'],
})
export class BranDetailsComponent {
  constructor(
    private _EcomdataService: EcomDataService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  brandId: any;
  brandDetails: any = null;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.brandId = params.get('id');
      },
    });

    this._EcomdataService.getBrandData(this.brandId).subscribe({
      next: (response) => {
        this.brandDetails = response.data;
      },
    });
  }
}
