import { Injectable } from '@angular/core';
import { Product } from 'src/Model/Product';
import { Cart } from 'src/Model/Cart';
import { ProductServiceService } from './product-service.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart[];
  products: Product[];
 totalPrice: Number; 

  constructor(private pro: ProductServiceService) { 
    this.cart = [];
    this.products=[];
    this.totalPrice = 0;

    this.pro.getAllProduct().subscribe(res =>{
      this.products = res; 
    })
  }

  AddAnItem(cart: Cart){
    this.cart.push(cart);  
  }

  getCart(){
    return this.cart;
  }

  CalculatePrice(): Number{
    this.totalPrice = 0;
    let len = this.cart.length;

    for(let i = 0; i < len; ++i){
      this.totalPrice = Number(this.totalPrice) + Number(this.cart[i].Count) 
      * Number(this.cart[i].product.price);
    }

  return this.totalPrice;
}


ClearCart(): void{
  this.cart = [];
}

}
