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

  createRecipe(heading:string,description:string,image:File){
    console.log(heading,description,image);
    const formData=new FormData();
    formData.append('heading',heading);
    formData.append('description',description);
    formData.append('image',image,heading);
    this.http.post<{message:string,recipe:Recipe}>('http://localhost:3000/recipes/new',formData).subscribe(response=>{
      console.log(response);
      this.router.navigate(['/recipes']);
      // this.recipeSub.next(response.recipe);
      // console.log(this.recipeSub);
      this.fetchRecipes();
      //this.router.navigate(['../']);
    })
  }

  deleteRecipe(id:number){
    this.http.delete('http://localhost:3000/recipes/'+id).subscribe(response =>{
      console.log(response);
      this.router.navigate(['/recipes']);
      this.fetchRecipes();
    })
  }

  fetchRecipes(){
    this.http.get<{message:string,recipe:any}>('http://localhost:3000/recipes/new').subscribe(response=>{
      console.log(response);
      this.recipeSub.next(response.recipe);
    })
  }

  getRecipeDetails(id:string){
    console.log(id);
    this.http.get('http://localhost:3000/recipes/new/' +id).subscribe(response=>{
      console.log(response);
    })
  }
}
