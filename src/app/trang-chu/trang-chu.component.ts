import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trang-chu',
  templateUrl: './trang-chu.component.html',
  styleUrls: ['./trang-chu.component.css']
})
export class TrangChuComponent implements OnInit {
  featured_products: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6; // Assuming 6 items per page
  selectedProductIndex: number = -1;
  isLoggedIn: boolean = false;
  
  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getFeatured_Products().subscribe(data => {
      this.featured_products = data;
    });
  }

  loadMore() {
    this.currentPage++;
    this.loadProducts();
  }
  selectProduct(index: number) {
    this.selectedProductIndex = index; // Gán index của sản phẩm được chọn
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
  logout() {
    // Thực hiện các thao tác cần thiết để đăng xuất
    this.isLoggedIn = false;
  }
}
