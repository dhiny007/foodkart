import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-new',
  templateUrl: './recipe-new.component.html',
  styleUrls: ['./recipe-new.component.css']
})
export class RecipeNewComponent implements OnInit {

  form:FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form=new FormGroup({
      'heading':new FormControl(null,{validators:[Validators.required]}),
      'description':new FormControl(null,Validators.required),
      'image':new FormControl(null)
    })
  }

  onSubmit(){}

}
