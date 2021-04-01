import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay} from 'rxjs/operators';

import {Todo, TodosService} from '../servicies/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'httpclient-rxjs';

  todoTitle = '';
  todos: Todo[] = [];
  loading = false;
  error = '';

  constructor(private todoService: TodosService) {
  }

  ngOnInit(): void {
    this.loadTodos();
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

  loadTodos() {
    this.loading = true;
    //this.todoService.loadTodos().subscribe();
    this.todoService.loadTodos().subscribe(
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
}

