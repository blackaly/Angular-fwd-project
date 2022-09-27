import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/Model/Product';
import { ProductServiceService } from '../services/product-service.service';
import { Cart } from 'src/Model/Cart';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  id: Number; 
  private temp: any; 
  private _temp: any; 
  product: Product | undefined;
  count: Number;
  constructor(private route: ActivatedRoute, private ProductService: ProductServiceService, private cart: CartService) { 
    this.count=1;
    this.id=0; 
    this.product={
      id: 0, 
      name: "",
      url:"", 
      price:0,
      description:""
    }
  }

  ngOnInit(): void {
    this.temp = this.route.params.subscribe(para => {
      this.id = para["id"];
    })

    this._temp = this.ProductService.getAllProduct().subscribe(res => {
      this.product = res.filter(x => x.id == this.id)[0];
    })
  }

  AddToTheCart(pro: Product | undefined){
    if(pro === undefined) return;
    if(this.count < 1) {
      alert("You entered 0 items, please add at least 1 item.")
      return; 
    } 

    if(this.ItemIsExist(pro)){
      alert("Item is in the cart already");
      return;
    }

    let newItem: Cart = {product: {
      id: 0, 
      name: "",
      url:"", 
      price:0,
      description:""
    }, Count:0}; 
    newItem.Count = this.count;
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
  this._temp.unsubscribe();
}


}
