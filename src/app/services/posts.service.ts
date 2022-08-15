import { NotFoundError } from './../exceptions/no-found-error';
import { AppError} from './../exceptions/app-error';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Post, Title} from '../types'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private url = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(this.url);
  }

  createPost(input:string) {
    return this.http.post<Title>(this.url, {title: input});
  }

  deletePost(id:number) {
   return this.http.delete(this.url + 's/' + id)
   .pipe(
   catchError((error:Response) =>
   {
    if(error.status === 404) return throwError(new NotFoundError);
   return throwError(new AppError());
   }
   )
   );

  }
}
