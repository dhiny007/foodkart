import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from '../ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnChanges {
  @Input() id:string;
  singleIngSub:Subscription;
  ingredient:any;
  editmode:boolean;

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
    if(this.editmode===false){
      this.shoppingListService.addIngredients(form.value.name,form.value.amount);
    }
    else{
      this.shoppingListService.updateIngredient(this.id,form.value.name,form.value.amount);
    }
  }

  onDeleteIngredient(){
    console.log(this.id);
    this.shoppingListService.deleteIngredient(this.id)
  }

  clearIngredient(){
    this.editmode=false;
    this.ingredient.ingName=null;
    this.ingredient.ingAmount=null;
  }

  ngOnChanges(changes:SimpleChanges){
    console.log(changes);
    console.log(changes['id'].currentValue);
    if(changes['id'].currentValue){
      this.shoppingListService.getIngredient(this.id);
      this.editmode=true;
      this.singleIngSub=this.shoppingListService.singleIng.subscribe(response=>{
        if(response){
        this.ingredient=response;
        }
      })
      console.log(this.ingredient);
    }
  }
}
