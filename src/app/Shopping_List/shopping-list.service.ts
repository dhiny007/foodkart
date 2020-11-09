import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from './ingredient.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingSub=new BehaviorSubject<Ingredient[]>([]);
  singleIng=new BehaviorSubject<Ingredient>(null);

  constructor(private http:HttpClient) { }

  getSubDetails(){
    return this.ingSub.asObservable();
  }

  addIngredients(ingName:string,ingAmount:number){
    const ingredient:Ingredient={ingName:ingName,ingAmount:ingAmount};
    console.log(ingredient);
    this.http.post('http://localhost:3000/shopping-list',ingredient).subscribe(response=>{
      console.log(response);
      this.fetchIngredients();
    })
  }

  fetchIngredients(){
    this.http.get<{message:string,ingredients:Ingredient[]}>('http://localhost:3000/shopping-list').subscribe(response=>{
      console.log(response);
      this.ingSub.next(response.ingredients);
    })
  }

  getIngredient(id:string){
    this.http.get<{message:string,ingredient:Ingredient}>('http://localhost:3000/shopping-list/'+id).subscribe(response=>{
      console.log(response);
      this.singleIng.next(response.ingredient);
    })
  }

  deleteIngredient(id:string){
    console.log(id);
    this.http.delete('http://localhost:3000/shopping-list/'+id).subscribe(response=>{
      console.log(response);
      this.fetchIngredients();
    });
  }

  updateIngredient(id:string,name:string,amount:number){
    const ingredient:Ingredient={ingName:name,ingAmount:amount};
    this.http.put('http://localhost:3000/shopping-list/'+id,ingredient).subscribe(response=>{
      console.log(response);
      this.fetchIngredients();
    })
  }
}
