import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { Post } from '../post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  constructor(public crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.getAll().subscribe((res: Post[]) => {
      console.log(res);
      this.posts = res;
    });
  }

  deletePost(id: number) {
    this.crudService.delete(id).subscribe((res) => {
      this.posts = this.posts.filter((post) => post.id !== id);
      console.log("Post deleted successfully");
    });
  }
}
