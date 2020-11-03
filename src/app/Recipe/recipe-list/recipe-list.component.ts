import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {

  //recipes:Recipe[]=[new Recipe('a test heading','a sample content','a sample image')];
  recipes:Recipe[];
  recipe=[];
  recipeSub:Subscription;
  id:number;
  recipeId:string;
  selected:boolean;
  ind:number;


  constructor(private router:Router,private route:ActivatedRoute,private recipeService:RecipeService) { }

  ngOnInit(){
    console.log('service call');
    this.recipeService.fetchRecipes();
    this.recipeSub=this.recipeService.getSubjectDetails().subscribe(response=>{
      //console.log(response);
        this.recipe.push(response);
      this.recipes=response;
     // console.log(this.recipe);
      //console.log(this.id);
      // if(this.recipes[0]){
      //   console.log(this.recipes[0]['_id']);
      // }
      console.log(this.recipes);

    })
    // this.route.params.subscribe((params:Params)=>{
    //   this.id=+params['id'];
    //  // console.log(this.id);
    //   //console.log(this.recipeId);
    // })
  }

  selectedElement(index){
    console.log(index);
    // for(let recipe of this.recipes){
    //   if(recipe['_id']==index){
    //     this.ind=index;
    //   }
    //   else{
    //     this.ind=null;
    //   }
    // }
    this.ind=index;
  }

  onNavigate(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }

  getRecipe(id){
    //console.log(id);
    this.id=id;
    //console.log(this.id);
    this.router.navigate([id],{relativeTo:this.route});
    this.recipeService.getRecipeDetails(""+this.id);

  }

  onDelete(){
    this.recipeService.deleteRecipe(this.id);
  }

  ngOnDestroy(){
    this.recipeSub.unsubscribe();
  }
}
