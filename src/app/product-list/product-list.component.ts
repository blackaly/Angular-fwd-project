import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/Model/Product';
import { ProductServiceService } from '../services/product-service.service';
import { CartService } from '../services/cart.service';
import { Cart } from 'src/Model/Cart';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: Product[]; 
  count: Number[];
  private temp: any; 
  constructor(private productsService: ProductServiceService, private cart : CartService) {
    this.products = [];
    this.count = [];
   }

  ngOnInit(): void {
    this.temp = this.productsService.getAllProduct().subscribe(res => {
      this.products = res;
    });

  }

  AddToTheCart(pro: Product){

    if(this.ItemIsExist(pro)){
      alert("Item is in the cart already");
      return;
    }

    if(this.count.length != 0){
      let len = this.count.length;
      for(let i = 0; i < len; ++i){
        if(this.count[i] < 1){
          alert("You entered 0 items, please add at least 1 item");
          return;
        }
      }
    }

    let newItem: Cart = {product: {
      id: 0, 
      name: "",
      url:"", 
      price:0,
      description:""
    }, Count:0}; 

    this.count.forEach(x => newItem.Count = x);
    newItem.product = pro; 

    this.cart.AddAnItem(newItem);
    alert("added to cart");
  }

  ItemIsExist(pro: Product){
    let len: Number = this.cart.getCart().length; 
    let flag: Boolean = false; 
    for(let i = 0; i < len; ++i){
      if(this.cart.getCart()[i].product.id == pro.id){
        flag = true; 
        break;
      }
    }
    
    return flag;
  }

ngOnDestroy(): void {
  this.temp.unsubscribe();
  
}

  
}
