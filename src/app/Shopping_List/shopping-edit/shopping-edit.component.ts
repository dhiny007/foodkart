import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnChanges {
  @Input() id:string;

  constructor(private shoppingListService:ShoppingListService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
      console.log('in');
      })
    //this.id=this.route.snapshot.params.id;
    console.log(this.id);
  }

  onSubmit(form:NgForm){
    this.shoppingListService.addIngredients(form.value.name,form.value.amount);
  }

  onDeleteIngredient(){
    console.log(this.id);
    this.shoppingListService.deleteIngredient(this.id)
  }

  ngOnChanges(changes:SimpleChanges){
    console.log(changes);
    console.log(changes['id'].currentValue);
  }
}
