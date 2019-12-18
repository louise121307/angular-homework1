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

      case TodoStatusType.Active:
        list = this.getRemainingList();
        break;

      case TodoStatusType.Completed:
        list = this.getCompletedList();
        break;

      default:
        list = this.todoListService.getList();
        break;

    }

    return list;

  }

  remove(index: number): void {
    this.todoListService.remove(index);
  }

  edit(todo: Todo): void {
    todo.editable = true;
  }

  update(todo: Todo, newTitle: string): void {

    const title = newTitle.trim();

    // 如果有輸入名稱則修改事項名稱
    if (title) {
      todo.setTitle(title);
      todo.editable = false;

    // 如果沒有名稱則刪除該項待辦事項
    } else {
      const index = this.getList().indexOf(todo);
      if (index !== -1) {
        this.remove(index);
      }
    }

  }

  cancelEditing(todo: Todo): void {
    todo.editable = false;
  }

  getRemainingList(): Todo[] {
    return this.todoListService.getWithCompleted(false);
  }

  getCompletedList(): Todo[] {
    return this.todoListService.getWithCompleted(true);
  }

  setStatus(status: number): void {
    this.status = status;
  }

  checkStatus(status: number): boolean {
    return this.status === status;
  }

  removeCompleted(): void {
    this.todoListService.removeCompleted();
  }

  getAllList(): Todo[] {
    return this.todoListService.getList();
  }

  allCompleted(): boolean {
    return this.getAllList().length === this.getCompletedList().length;
  }

  setAllTo(completed: boolean): void {

    this.getAllList().forEach((todo) => {
      todo.setCompleted(completed);
    });

  }

}
