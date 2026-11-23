import { PayComponent } from './features/pay/pay.component';
import { Routes } from '@angular/router';

export const routes: Routes = [

    {path:"" , redirectTo:"home", pathMatch : "full"},
    {path:'home' , loadComponent:()=>import('./features/home/home.component').then((c)=>c.HomeComponent) , title :'Home page'},
    {path:"shop" , loadComponent:()=>import('./features/shop/shop.component').then((c)=>c.ShopComponent),title:'Shop page'},
    {path:"contact" , loadComponent:()=>import('./features/contact/contact.component').then((c)=>c.SupportComponent),title:'Support'},
    {path:"Product-Detailes/:id" , loadComponent:()=>import('./features/product-details/product-details.component').then((c)=>c.ProductDetailsComponent),title:'Shop page'},
    {path:"categories" , loadComponent:()=>import('./features/categories/categories.component').then((c)=>c.CategoriesComponent), title:'Categories page'},
    {path:"Special-Categories/:id" , loadComponent:()=>import('./features/special-categories/special-categories.component').then((c)=>c.SpecialCategoriesComponent), title:'Categories page'},
    {path:"brands" , loadComponent:()=>import('./features/brands/brands.component').then((c)=>c.BrandsComponent), title:'Brands page'},
    {path:"brands-datailes/:id" , loadComponent:()=>import('./features/special-brand/special-brand.component').then((c)=>c.SpecialBrandComponent), title:'Brands page'},
    {path:"cart" , loadComponent:()=>import('./features/cart/cart.component').then((c)=>c.CartComponent), title:'Cart page'},
    {path:"pay/:id" , loadComponent:()=>import('./features/pay/pay.component').then((c)=>c.PayComponent), title:'Pay page'},
    {path:"allorders" , loadComponent:()=>import('./features/allorders/allorders.component').then((c)=>c.AllOrdersComponent), title:'All orders'},
    {path:"wishlist" , loadComponent:()=>import('./features/wishlist/wishlist.component').then((c)=>c.WishlistComponent), title:'Wishlist page'},
    {path:"sign-in" , loadComponent:()=>import('./features/sign-in/sign-in.component').then((c)=>c.SignInComponent), title:'Sign in'},
    {path:"register" , loadComponent:()=>import('./features/register/register.component').then((c)=>c.RegisterComponent), title:'Register'},
    {path:"forgot-password" , loadComponent:()=>import('./features/forgot-password/forgot-password.component').then((c)=>c.ForgotPasswordComponent), title:'Forgot Password'},
    {path:"Change-Password" , loadComponent:()=>import('./features/update-logged-user-password/update-logged-user-password.component').then((c)=>c.UpdateLoggedUserPasswordComponent), title:'Change Password'},
    {path:"**" , loadComponent:()=>import('./features/not-found/not-found.component').then((c)=>c.NotFoundComponent), title :'NotFound'}
];
