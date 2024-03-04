import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private _HttpClient: HttpClient) {}
  favNumb: BehaviorSubject<number> = new BehaviorSubject(0);
  whishList: BehaviorSubject<any> = new BehaviorSubject([]);
  headers: any = { token: localStorage.getItem('eToken') };

  addToWishList(productId: string | undefined): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId: productId },
      { headers: this.headers }
    );
  }

  getWishList(): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { headers: this.headers }
    );
  }

  removeItem(productId: string | undefined): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      { headers: this.headers }
    );
  }
}
