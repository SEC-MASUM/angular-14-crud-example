import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { Post } from '../post';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  id!: number;
  post!: Post;
  postForm!: FormGroup;

  constructor(
    public crudService: CrudService,
    private route: ActivatedRoute, //? Aita er kaj ki
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.crudService.getById(this.id).subscribe((res: Post) => {
      this.post = res;
    });

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
    this.crudService
      .update(this.id, this.postForm.value)
      .subscribe((res: any) => {
        console.log('Post updated successfully');
        this.router.navigateByUrl('post/home');
      });
  }
}
