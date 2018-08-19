import {Component, HostBinding, Input, OnChanges, OnInit} from '@angular/core';
import {TodoItem} from '../todo-item';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  host: {'class': 'list-group-item'}
})

export class TodoItemComponent implements OnInit, OnChanges {

  @Input() item: TodoItem;
  @Input() onDone;
  @Input() onRemove;

  @HostBinding('class.list-group-item-success') isDone: boolean;

  constructor() { }

  ngOnInit() {
    this.isDone = this.item.done;
  }

  ngOnChanges(changes) {
    this.isDone = this.item.done;
  }

  done() {
    this.onDone(this.item);
  }

  remove() {
    this.onRemove(this.item);
  }

}
