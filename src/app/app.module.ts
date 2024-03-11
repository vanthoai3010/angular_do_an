import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrangChuComponent } from './trang-chu/trang-chu.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { BookComponent } from './book/book.component';
import { CartService } from './cart.service';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { DangkyComponent } from './dangky/dangky.component';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ThanhtoanComponent } from './thanhtoan/thanhtoan.component';

@NgModule({
  declarations: [
    AppComponent,
    TrangChuComponent,
    MenuComponent,
    AboutComponent,
    BookComponent,
    CartComponent,
    LoginComponent,
    DangkyComponent,
    AdminComponent,
    EditProductComponent,
    ThanhtoanComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
    
  ],
  providers: [
    CartService,
    provideClientHydration(),
    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
