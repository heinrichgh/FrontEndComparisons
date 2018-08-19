import {TodoItem} from './todo-item';

const todoItems: TodoItem[] = [];

for (let i = 0; i < 10; i++) {
  todoItems.push(new TodoItem(
    i,
    `Todo ${i}`,
    false,
    new Date())
);
}

export default todoItems;
