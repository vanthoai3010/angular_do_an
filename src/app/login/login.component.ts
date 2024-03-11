import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  registrationError: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  private checkCredentials(): Observable<boolean> {
    return this.http.get<any>('http://localhost:3000/user').pipe(
      map((data: any) => {
        const user = data.find((user: any) => user.username === this.username && user.password === this.password);
        return user !== undefined; // Trả về true nếu tìm thấy người dùng, ngược lại trả về false
      }),
      catchError(() => of(false))
    );
  }

  private isAdmin(username: string): boolean {
    // Kiểm tra xem người dùng có phải là admin không (đây là một logic đơn giản, bạn có thể điều chỉnh logic này theo yêu cầu của bạn)
    return username === 'admin';
  }

  onSubmit() {
    this.checkCredentials().subscribe((authenticated: boolean) => {
      if (authenticated) {
        Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công!',
          confirmButtonText: 'OK'
        });
        if (this.isAdmin(this.username)) {
          this.router.navigate(['/admin']); // Trả về trang admin nếu người dùng là admin
        } else {
          this.router.navigate(['/menu']);
        }
      } else {
        this.registrationError = 'Tên đăng nhập hoặc mật khẩu không đúng';
        return;
      }
    });
  }
}
