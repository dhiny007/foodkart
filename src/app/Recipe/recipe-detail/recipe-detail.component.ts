import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  form:FormGroup;
  imagePreview:string;
  id:string;

  constructor(private router:Router,private recipeService:RecipeService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.form=new FormGroup({
      'heading':new FormControl(null,{validators:[Validators.required]}),
      'description':new FormControl(null,Validators.required),
    })
    this.route.params.subscribe((params:Params)=>{
          this.id=params['id'];
          console.log(this.id);
          this.recipeService.getRecipeDetails(this.id);
       })
  }


  onImagePicked(event:Event){
    console.log(event);
    const file=(event.target as HTMLInputElement).files[0];
    this.form.patchValue({'image':file});
    const reader=new FileReader();
    reader.onload = () => {
      this.imagePreview=reader.result as string;
    }
    reader.readAsDataURL(file);
    console.log(file);
    console.log(this.form);
  }

  onCancel(){
    this.router.navigate(['/recipes']);
  }

  onSubmit(){

  }
}
