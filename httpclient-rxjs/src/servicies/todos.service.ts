import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, debounce, delay, map, retry, tap} from 'rxjs/operators';

export interface Todo {
  id?: number;
  title: string;
  completed: boolean;
}

@Injectable({providedIn: 'root'})
export class TodosService {
  constructor(private http: HttpClient) {
  }

  addTodo(todo: Todo): Observable<Todo> {
    let headers = new HttpHeaders({
      customHeader: Math.random().toString()
    });
    headers = headers.set('TestHeader', 'test header');
    return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo, {headers});
  }

  loadTodos(): Observable<Todo[]> {
    let params = new HttpParams();
    params = params.append('_limit', '4');

    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
      params,
      observe: 'response'
    })
      .pipe(
        map(response => {
          console.log(response);
          return response.body;
        }),
        //retry(3),
        delay(500),
        catchError(err => {
          console.log('Error', err.message);
          return throwError(err);
        }));
  };

  deleteTodo(id: number): Observable<any> {
    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      observe: 'events'
    }).pipe(
      tap(event => {
        //console.log(event);
        if (event.type === HttpEventType.Sent) {
          console.log('Sent', event);
        }
      }));
  }

  completeTodo(id: number):
    Observable<Todo> {
    return this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      completed: true
    });
    /*, {
      responseType: 'json'
    });*/
  }
}
