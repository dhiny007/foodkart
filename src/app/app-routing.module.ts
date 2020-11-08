import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { RecipeDetailComponent } from './Recipe/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './Recipe/recipe-list/recipe-list.component';
import { RecipeNewComponent } from './Recipe/recipe-new/recipe-new.component';
import { ShoppingEditComponent } from './Shopping_List/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './Shopping_List/shopping-list/shopping-list.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'recipes',component:RecipeListComponent,children:[
    // {path:':recipeId',component:RecipeDetailComponent},
    {path:'new',component:RecipeNewComponent},
    {path:':id',component:RecipeDetailComponent}
  ]},
  {path:'shopping-list',component:ShoppingListComponent,children:[
    {path:':id',component:ShoppingEditComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
