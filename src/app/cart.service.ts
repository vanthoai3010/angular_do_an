import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public items: any[] = [];

  constructor(private http: HttpClient) { } // Inject HttpClient here

  addToCart(product: any) {
    const existingItem = this.items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      product.quantity = 1;
      this.items.push(product);
    }
    console.log('Sản phẩm đã được thêm vào giỏ hàng:', product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/products');
  }

  removeItem(item: any) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  updateCart(items: any[]) {
    this.items = items;
  }
  getTotalAmount() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
