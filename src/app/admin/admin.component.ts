import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  newProduct = { id: '', name: '', description: '', price: '', image: '', quantity: 1 };
  editedProduct = { id: '', name: '', description: '', price: '', image: '' };
  productId: string = '';
  products: any[] = [];
  users: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private productService: ProductService, private userService: UserService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id')!;
      this.fetchProduct(this.productId);
    });

    this.loadProducts();
    this.loadUsers();
  }

  onSubmit() {
    this.http.post<any>('http://localhost:3000/products', this.newProduct).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Thêm sản phẩm thành công!',
        });
        this.loadProducts(); // Load lại danh sách sản phẩm sau khi thêm
      },
      error => {
        console.error('Error adding product:', error);
        alert('Error adding product. Please try again.'); // Thông báo lỗi nếu có lỗi xảy ra
      }
    );
  }

  fetchProduct(id: string) {
    this.http.get<any>('http://localhost:3000/products/' + id).subscribe(
      (data: any) => {
        this.editedProduct = data;
      },
      error => {
        console.error('Error fetching product:', error);
      }
    );
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteProduct(id: string) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.http.delete<any>('http://localhost:3000/products/' + id).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Xóa sản phẩm thành công!',
          });
          this.loadProducts(); // Load lại danh sách sản phẩm sau khi xóa
        },
        error => {
          console.error('Có lỗi khi xóa sản phẩm:', error);
          alert('Error deleting product. Please try again.'); // Thông báo lỗi nếu có lỗi xảy ra
        }
      );
    }
  }

  deleteUser(id: string) {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      this.http.delete<any>('http://localhost:3000/user/' + id).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Xóa người dùng thành công!',
          });
          this.loadUsers(); // Load lại danh sách người dùng sau khi xóa
        },
        error => {
          console.error('Có lỗi khi xóa người dùng:', error);
          Swal.fire({
            icon: 'error',
            title: 'Xóa người dùng thất bại!',
          });
        }
      );
    }
  }
}
