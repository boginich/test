import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {debounceTime, delay, distinctUntilChanged, filter, map, observeOn, switchMap} from 'rxjs/operators';

import {Todo, TodosService} from '../servicies/todos.service';
import {asyncScheduler, interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'httpclient-rxjs';

  checked: boolean;
  todoTitle = '';
  todos: Todo[] = [];
  loading = false;
  error = '';

  interval$ = interval(1000);
  subInterval: Subscription;

  constructor(private todoService: TodosService) {
  }

  ngOnInit(): void {
    // this.loadTodos();
  }

  addTodo() {
    if (!this.todoTitle.trim()) {
      return;
    }

    const newTodo: Todo = {
      title: this.todoTitle,
      completed: false
    };

    this.todoService.addTodo(newTodo).subscribe(todo => {
      this.todos.push(todo);
      this.todoTitle = '';
    });
  }

  loadTodos(limit: number = 4) {
    this.loading = true;
    //this.todoService.loadTodos().subscribe();
    this.todoService.loadTodos(limit).subscribe(
      todos => {
        this.todos = todos;
        this.loading = false;
      }, error => {
        this.error = error.message;
      });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id)
      .subscribe(() => {
        this.todos = this.todos.filter(t => t.id !== id);
      });
  }

  completeTodo(id: number) {
    this.todoService.completeTodo(id).subscribe(todo => {
      this.todos.find(t => t.id === todo.id)!.completed = true;
    });
  }

  onChanged(checked: boolean) {
    if (!checked) {
      this.subInterval?.unsubscribe();
    } else {
      this.subInterval = this.interval$
        .pipe(
          filter(value => value % 2 === 0),
          map(value => Math.round(Math.random() * value)),
        )
        .subscribe(
          (value) => this.loadTodos(value),
          (err) => console.log(err),
          () => console.log('done')
        );
      /*.subscribe((value) => this.loadTodos(value), ()=> {
      console.log('done');
    });*/
      console.log('just after AutoUpdate subscribe');
    }
  }
}

