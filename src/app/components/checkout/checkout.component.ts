import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _FormBuilder: FormBuilder,
    private _CartService: CartService
  ) {}
  cartId: any = '';
  checkOut: FormGroup = this._FormBuilder.group({
    details: [''],
    phone: [''],
    city: [''],
  });

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (parms) => {
        this.cartId = parms.get('id');
      },
    });
  }

  handleForm() {
    console.log(this.checkOut.value);
    this._CartService.checkOut(this.cartId, this.checkOut.value).subscribe({
      next: (response) => {
        if (response.status == 'success') {
          window.open(response.session.url, '_self');
        }
        console.log(response);

        // this.cartDetails = response.data;
      },
    });
  }
}
