import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-thanhtoan',
  templateUrl: './thanhtoan.component.html',
  styleUrls: ['./thanhtoan.component.css']
})
export class ThanhtoanComponent {
  onSubmit() {
    // Xử lý dữ liệu đầu vào và các thao tác khác (nếu cần)

    // Hiển thị thông báo thanh toán thành công
    Swal.fire({
      icon: 'success',
      title: 'Thanh toán thành công!',
      text: 'Đơn hàng sẽ được giao trong vài phút!',
      confirmButtonText: 'OK'
    });
  }
}
