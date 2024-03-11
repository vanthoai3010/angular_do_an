import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:3000/user'; // Đường dẫn đến tệp db.json
    private isLoggedIn: boolean = false;
    private isAdmin: boolean = false;
    constructor(private http: HttpClient) { }

    


    logout(): void {
        // Thực hiện đăng xuất và cập nhật isLoggedIn và isAdmin về false
        this.isLoggedIn = false;
        this.isAdmin = false;
    }

    isLoggedInUser(): boolean {
        return this.isLoggedIn;
    }

    isAdminUser(): boolean {
        return this.isAdmin;
    }


    // Phương thức để lấy dữ liệu từ db.json
    getUsers(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
