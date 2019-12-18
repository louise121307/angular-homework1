import { Injectable } from '@angular/core';

// Class
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private list: Todo[] = [];

  constructor() { }

  getList(): Todo[] {
    return this.list;
  }

  add(title: string): void {

    // 避免傳入的 title 是無效值或空白字串，稍微判斷一下
    if (title || title.trim()) {
      this.list.push(new Todo(title));
    }

  }

  remove(index: number): void {
    this.list.splice(index, 1);
  }

  removeCompleted(): void {
    this.list = this.getWithCompleted(false);
  }

  getWithCompleted(completed: boolean): Todo[] {
    return this.list.filter(todo => todo.done === completed);
  }

}
