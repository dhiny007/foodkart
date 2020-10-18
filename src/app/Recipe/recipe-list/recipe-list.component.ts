import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  //recipes:Recipe[]=[new Recipe('a test heading','a sample content','a sample image')];
  recipes:Recipe[];

  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  onNavigate(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }

}
