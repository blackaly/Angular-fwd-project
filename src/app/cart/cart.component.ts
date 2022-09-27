import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from 'src/Model/Product';
import { Cart } from 'src/Model/Cart';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  _cart: Cart[]; 
  productPrice: Number; 
  Count: Number[]; 
  constructor(private cart: CartService, private route: Router) {
    this._cart = []; 
    this.productPrice = 0;
    this.Count = [];
   }

  ngOnInit(): void {
    this._cart = this.cart.getCart();

    for(let i = 0; i < this._cart.length; ++i){
      this.Count[i] = this._cart[i].Count;
    }

    this.productPrice = this.cart.CalculatePrice();
  }

  onChange(product: Cart, index: any){
    let number = this.Count[index]; 

    if(number < 1){
      this.removeItem(product.product.id);
      alert("item deleted");
    }
    else{
      this.ModifyItem(product.product.id, this.Count[index]);
    }

    this.productPrice = this.cart.CalculatePrice();

  }


  ModifyItem(productid: Number, count: Number){
    let index = this.cart.getCart().findIndex(x => x.product.id == productid);
    if(index == undefined) return; 
    this.cart.cart[index].Count = count; 
  }

  removeItem(id: Number){
    let index = this.cart.getCart().findIndex(x => x.product.id == id);
    if(index == undefined) return; 
    this.cart.cart.splice(index, 1);

  }

  successEvent(name: any): void{
    this.cart.ClearCart();
    this.route.navigateByUrl(`success/${name}/${this.productPrice}`);
  }

}
