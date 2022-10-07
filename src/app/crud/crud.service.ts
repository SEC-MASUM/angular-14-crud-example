import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private apiURL = 'https://jsonplaceholder.typicode.com';

  //*---------- Http Header Options---------//
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  getById(id: number): Observable<Post> {
    return this.httpClient
      .get<Post>(this.apiURL + '/posts/' + id)
      .pipe(catchError(this.errorHandler));
  }

  getAll(): Observable<Post[]> {
    return this.httpClient
      .get<Post[]>(this.apiURL + '/posts')
      .pipe(catchError(this.errorHandler));
  }

  create(post: Post): Observable<Post> {
    return this.httpClient
      .post<Post>(
        this.apiURL + '/posts/',
        JSON.stringify(post),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, post: Post): Observable<Post> {
    return this.httpClient
      .patch<Post>(
        this.apiURL + '/posts/' + id,
        JSON.stringify(post),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient
      .delete<Post>(this.apiURL + '/posts/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
