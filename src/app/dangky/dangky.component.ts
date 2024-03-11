// dangky.component.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dangky',
  templateUrl: './dangky.component.html',
  styleUrls: ['./dangky.component.css']
})
export class DangkyComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  registrationError: string = '';

  constructor(private http: HttpClient 
    , private router: Router
    ) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.registrationError = 'Mật khẩu không khớp';
      return;
    }

    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost:3000/user', userData)
      .subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Đăng ký thành công!',
            text: 'Đăng nhập ngay?',
            confirmButtonText: 'OK'
          });
          console.log('Tên đăng nhập:', response.username);
          console.log('Mật khẩu:', response.password);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Đã xảy ra lỗi khi đăng ký:', error);
          this.registrationError = 'Đã xảy ra lỗi khi đăng ký';
        }
      );
  }
}
