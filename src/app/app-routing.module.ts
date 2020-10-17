import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { RecipeDetailComponent } from './Recipe/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './Recipe/recipe-list/recipe-list.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'recipes',component:RecipeListComponent},
  {path:'recipes/:recipeId',component:RecipeDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
