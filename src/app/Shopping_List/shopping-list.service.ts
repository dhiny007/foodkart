import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from './ingredient.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingSub=new BehaviorSubject<Ingredient[]>([]);

  constructor(private http:HttpClient) { }

  getSubDetails(){
    return this.ingSub.asObservable();
  }

  addIngredients(ingName:string,ingAmount:number){
    const ingredient:Ingredient={ingName:ingName,ingAmount:ingAmount};
    console.log(ingredient);
    this.http.post('http://localhost:3000/shopping-list',ingredient).subscribe(response=>{
      console.log(response);
    })
  }

  fetchIngredients(){
    this.http.get<{message:string,ingredients:Ingredient[]}>('http://localhost:3000/shopping-list').subscribe(response=>{
      console.log(response);
      this.ingSub.next(response.ingredients);
    })
  }

  deleteIngredient(id:string){
    console.log(id);
    this.http.delete('http://localhost:3000/shopping-list/'+id).subscribe(response=>{
      console.log(response);
    });
    this.fetchIngredients();
  }
}
