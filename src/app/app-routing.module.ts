import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CompleteOrderComponent } from './complete-order/complete-order.component';
const routes: Routes = [
  {path:"", component: ProductListComponent},
  {path:"cart", component: CartComponent},
  {path:"details/:id", component: ProductDetailsComponent},
  {path: "success/:name/:price", component: CompleteOrderComponent}, 
  {path: '**', redirectTo: '/'}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
