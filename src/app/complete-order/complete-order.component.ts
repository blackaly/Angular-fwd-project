import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-complete-order',
  templateUrl: './complete-order.component.html',
  styleUrls: ['./complete-order.component.css']
})
export class CompleteOrderComponent implements OnInit {

  private temp: any; 
  name: String; 
  price: Number; 

  constructor(private route: ActivatedRoute) { 
    this.name = ""; 
    this.price = 0; 
  }

  ngOnInit(): void {
    this.temp = this.route.params.subscribe(para => {
      this.name = para["name"];
      this.price = para["price"];
    })
  }

}
