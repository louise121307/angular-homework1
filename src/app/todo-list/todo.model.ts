export class Todo {

  private title = '';
  private completed = false;

  constructor(title: string, completed?: boolean) {
    this.title = title || '';
 //   this.title = this.title.substr(0, 20);
    if (typeof completed === 'boolean') {
      this.completed = completed;
    }
  }

  getTitle(): string {
    return this.title;
  }

  getCompleted(): boolean {
    return this.completed;
  }

  getStatus(): string {
    if (this.completed) { return 'DONE'; } else { return 'OPEN'; }
  }

  setTitle(title: string): void {
    this.title = title;
  }

  setCompleted(completed: boolean): void {
    this.completed = completed;
  }

  toggleCompletion(): void {
    this.completed = !this.completed;
  }

}
