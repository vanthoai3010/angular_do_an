import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
 // Add the import statement for 'Observable' from 'rxjs' package
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  products: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6; // Assuming 6 items per page
  selectedProductIndex: number = -1;

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  loadMore() {
    this.currentPage++;
    this.loadProducts();
  }

  addToCart(product: any) {
    Swal.fire({
      icon: 'success',
      title: 'Đã thêm sản phẩm vào giỏ hàng',
      showConfirmButton: false,
      timer: 1500
    });
    console.log('addToCart function called');
    this.cartService.addToCart(product);
  }
}
