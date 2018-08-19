export class TodoItem {
  constructor(
    public id: number,
    public label: string,
    public done: boolean,
    public dateAdded: Date) {}
  dateTimeString() {
    return `${this.dateAdded.toLocaleDateString(window.navigator.language)} ${this.dateAdded.getHours()}:${this.dateAdded.getMinutes()}`;
  }
}
