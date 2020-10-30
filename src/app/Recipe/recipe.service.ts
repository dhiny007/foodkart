import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSub=new BehaviorSubject<Recipe[]>([]);

  constructor(private http:HttpClient,private router:Router) { }


  getSubjectDetails(){
    return this.recipeSub.asObservable();
  }

  createRecipe(heading:string,description:string,imageURL:string){
    console.log(heading,description,imageURL);
    const formData=new FormData();
    formData.append('heading',heading);
    formData.append('description',description);
    formData.append('image',imageURL,heading);
    this.http.post<{message:string,recipe:Recipe[]}>('http://localhost:3000/recipes/new',formData).subscribe(response=>{
      console.log(response);
      this.router.navigate(['/recipes']);
      this.recipeSub.next(response.recipe);
      console.log(this.recipeSub);
      this.fetchRecipes();
    })
  }

  fetchRecipes(){
    this.http.get<{message:string,recipe:Recipe[]}>('http://localhost:3000/recipes/new').subscribe(response=>{
      console.log(response);
      this.recipeSub.next(response.recipe);
    })
  }

  getRecipeId(id:number){
    this.http.get('http://localhost:3000/recipes/new/' +id).subscribe(response=>{
      console.log(response);
    })
  }
}
