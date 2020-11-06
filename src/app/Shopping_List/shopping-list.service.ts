import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from './ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor(private http:HttpClient) { }

  addIngredients(ingName:string,ingAmount:number){
    const ingredient:Ingredient={ingName:ingName,ingAmount:ingAmount};
    console.log(ingredient);
    this.http.post('http://localhost:3000/shopping-list',ingredient).subscribe(response=>{
      console.log(response);
    })
  }
}
