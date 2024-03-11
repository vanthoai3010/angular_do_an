import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrangChuComponent } from './trang-chu/trang-chu.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { BookComponent } from './book/book.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { DangkyComponent } from './dangky/dangky.component';
import { AdminComponent } from './admin/admin.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ThanhtoanComponent } from './thanhtoan/thanhtoan.component';

const routes: Routes = [
  { path: 'trang-chu', component: TrangChuComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/trang-chu', pathMatch: 'full' },
  { path: 'book', component: BookComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent }, // Đường dẫn cho trang đăng nhập
  { path: 'dangky', component: DangkyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent }, 
  { path: 'edit-product/:id', component: EditProductComponent },
  { path: 'thanhtoan', component: ThanhtoanComponent },
  // Áp dụng AdminGuard
  // Các route khác...
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

