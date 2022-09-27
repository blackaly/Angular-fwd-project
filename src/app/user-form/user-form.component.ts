import { Component, EventEmitter, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  id: Number; 
  private temp: any; 
  Name: String; 
  Address: String;
  CreditCard: String; 
  error: String;

  @Output() successEvent: EventEmitter<any> = new EventEmitter(); 

  constructor() { 
    this.id = 0;
    this.Name = ""; 
    this.Address = "";
    this.CreditCard = "";
    this.error = "";
  }

  ngOnInit(): void {
  }

  OnSubmit(){

      this.successEvent.emit(this.Name);
      this.Name = "";
      this.Address = "";
      this.CreditCard = ""; 
  }

  validate(): void{
    if(this.CreditCard != '' && this.CreditCard.length < 16)
      this.error = "Card nubmers is less than 16 digit";

    else if(this.CreditCard != '' && this.CreditCard.match("/^[0-9]+$/") == null)
      this.error = "Input field must be numbers only";
    
    else 
      this.error = "";

  }

}
