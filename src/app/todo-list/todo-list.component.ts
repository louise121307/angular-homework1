import { Component, OnInit } from '@angular/core';

// Service
import { TodoListService } from './todo-list.service';

// Class
import { Todo } from './todo.model';

// Enum
import { TodoStatusType } from './todo-status-type.enum';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoStatusType = TodoStatusType;
  private status = TodoStatusType.All;

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
    this.todoListService.add('Item 1');
    this.todoListService.add('Item 2', true);
    this.todoListService.add('Item 3');
  }

  addTodo(inputRef: HTMLInputElement): void {
    const todo = inputRef.value.trim();
    if (todo) {
      this.todoListService.add(todo);
      inputRef.value = '';
    }
  }

  getList(): Todo[] {

    let list: Todo[] = [];

    switch (this.status) {

      case TodoStatusType.Open:
        list = this.todoListService.getListWithCompleted(false);
        break;

      case TodoStatusType.Done:
        list = this.todoListService.getListWithCompleted(true);
        break;

      default:
        list = this.todoListService.getList();
        break;

    }

    return list;

  }

  setStatus(status: number): void {
    this.status = status;
  }

  checkStatus(status: number): boolean {
    return this.status === status;
  }

  getAllList(): Todo[] {
    return this.todoListService.getList();
  }

}
