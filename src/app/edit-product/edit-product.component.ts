import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId: string = '';
  editedProduct: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id') || '';
      this.fetchProduct(this.productId);
    });
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

  onSubmit() {
    this.http.put<any>('http://localhost:3000/products/' + this.productId, this.editedProduct).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Cập nhật sản phẩm thành công!',
        });
      },
      error => {
        console.error('Có lỗi khi cập nhật sản phẩm:', error);
        alert('Error updating product. Please try again.'); // Thông báo lỗi nếu có lỗi xảy ra
      }
    );
  }
}
