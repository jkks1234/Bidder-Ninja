import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AuthService} from './services/auth.service'
import {AuthGuard} from './guards/auth.guard'
import {HttpModule} from '@angular/http'
import {RouterModule,Routes} from '@angular/router'
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostitemComponent } from './components/postitem/postitem.component';
import { ShowitemsComponent } from './components/showitems/showitems.component';
import { ListoneComponent } from './components/listone/listone.component';
import { MyproductsComponent } from './components/myproducts/myproducts.component';
import { SoldproductsComponent } from './components/soldproducts/soldproducts.component';
import { PurchasedproductsComponent } from './components/purchasedproducts/purchasedproducts.component';
import { FilterPipe } from './filter.pipe';

const appRoutes: Routes=[
  {path:'signup',component:SignupComponent},
  {path:'login'   ,component:LoginComponent} ,
  {path:'navbar',component:NavbarComponent},
  {path:'postitem',component:PostitemComponent, canActivate:[AuthGuard]},
  {path:'showitems',component:ShowitemsComponent},
  {path:'listone/:id' ,component:ListoneComponent},
  {path:'myproducts' ,component:MyproductsComponent,canActivate:[AuthGuard]},
  {path:'soldproducts' ,component:SoldproductsComponent,canActivate:[AuthGuard]},
  {path:'purchasedproducts' ,component:PurchasedproductsComponent,canActivate:[AuthGuard]},

  
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    PostitemComponent,
    ShowitemsComponent,
    ListoneComponent,
    MyproductsComponent,
    SoldproductsComponent,
    PurchasedproductsComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
