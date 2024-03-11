import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public items: any[] = [];
  public products: any[] = [];
  public totalPrice: number = 0;

  constructor(private productService: ProductService, private cartService: CartService) { }
  
  ngOnInit(): void {
    this.loadProducts(); // Load products when component initializes
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.items = this.cartService.getItems(); // Update items after products are loaded
      this.calculateTotalPrice();
    });
  }

  clearCart() {
    this.items = this.cartService.clearCart();
    this.calculateTotalPrice();
  }

  removeItem(item: any) {
    this.cartService.removeItem(item);
    this.items = this.cartService.getItems();
    this.calculateTotalPrice();
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.cartService.updateCart(this.items);
    this.calculateTotalPrice();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateCart(this.items);
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    this.totalPrice = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getProductById(productId: number) {
    return this.products.find(product => product.id === productId);
  }
}
