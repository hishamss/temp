import { NotFoundError } from './../exceptions/no-found-error';
import { AppError } from './../exceptions/app-error';
import { PostsService } from './../services/posts.service';
import { Component, OnInit } from '@angular/core';
import { Post, Title } from '../types'




@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];
  titles: Title[] = [];

  constructor(private service: PostsService) {
  }

  ngOnInit() {
    this.service.getPosts()
      .subscribe(
        (reponse: Post[]) => {
          this.posts = reponse;
        },
        (error: any) => {
          console.log(error)
        });
  }



  addPost(input: HTMLInputElement) {
    this.service.createPost(input.value)
      .subscribe(
        (response: Title) => {
          console.log(response)
          this.titles.push(response);
        },
        (error: Response) => {
          console.log(error)
        })
  }

  removePost(post: Post) {
    this.service.deletePost(post.id)
      .subscribe(
        (response: any) => {
          let index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        },
        (error: AppError) => {
          if(error instanceof NotFoundError) alert('already has been delete')
          else alert('unexpected error')
        })

  }

}
