import {Component, OnInit} from '@angular/core';
import {TodoItem} from '../todo-item';

let newId = 0;

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  items: TodoItem[] = [];
  newItemValue = '';
  constructor() {
    this.markDone = this.markDone.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  ngOnInit() {
  }

  addItem() {
    this.items.push(new TodoItem(newId++, this.newItemValue, false, new Date()));
    this.newItemValue = '';
  }

  markDone(item: TodoItem) {
    const index = this.items.indexOf(item);
    this.items[index] = new TodoItem(
      item.id,
      item.label,
      true,
      item.dateAdded
    );
  }

  removeItem(item: TodoItem) {
    const index = this.items.indexOf(item);
    this.items = [
      ...this.items.slice(0, index),
      ...this.items.slice(index + 1)
    ];
  }

}
