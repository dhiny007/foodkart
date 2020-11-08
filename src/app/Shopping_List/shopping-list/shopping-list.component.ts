import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients=[];
  subscription:Subscription;
  index:string;
  id:string;

  constructor(private shoppingListService:ShoppingListService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.shoppingListService.fetchIngredients();
    this.subscription=this.shoppingListService.getSubDetails().subscribe(response=>{
      this.ingredients.push(response);
      console.log(response);
      this.ingredients=response;
    })
    console.log(this.ingredients);
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
      console.log(this.id);
      })
  }

  selectedElement(id:string){
    console.log(id);
    this.index=id;
  }

  getIngredient(id:string){
    //this.id=id;
    this.router.navigate([id],{relativeTo:this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
