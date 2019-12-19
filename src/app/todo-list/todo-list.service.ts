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

  getListWithCompleted(completed: boolean): Todo[] {
    return this.list.filter(todo => todo.getCompleted() === completed);
  }

  add(title: string, completed?: boolean): void {
    if (title || title.trim()) {
      this.list.push(new Todo(title, completed));
    }
  }

}
