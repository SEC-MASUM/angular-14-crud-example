import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  //? Why use ! after postForm
  postForm!: FormGroup;

  constructor(public crudService: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required),
    });
  }
  get f() {
    return this.postForm.controls;
  }

  submit() {
    console.log(this.postForm.value);
    this.crudService.create(this.postForm.value).subscribe((res) => {
      console.log('Post created successfully');
      this.router.navigateByUrl('post/home');
    });
  }
}
