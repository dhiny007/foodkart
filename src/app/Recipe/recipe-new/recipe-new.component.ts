import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-new',
  templateUrl: './recipe-new.component.html',
  styleUrls: ['./recipe-new.component.css']
})
export class RecipeNewComponent implements OnInit {

  form:FormGroup;
  imagePreview:string;

  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.form=new FormGroup({
      'heading':new FormControl(null,{validators:[Validators.required]}),
      'description':new FormControl(null,Validators.required),
      'image':new FormControl(null,Validators.required)
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

  onSubmit(){
    if(this.form.invalid){
      return;
    }
    console.log(this.form);
    this.recipeService.createRecipe(this.form.value.heading,this.form.value.description,this.form.value.image);
  }
}
