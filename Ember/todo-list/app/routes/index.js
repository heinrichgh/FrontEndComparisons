import Route from '@ember/routing/route';
import EmberObject from '@ember/object';

const Item = EmberObject.extend({

});


let todoList = [];
for (let i = 0; i < 10; i++) {
  todoList.push(
    Item.create({
      label: "Item " + i,
      done: false,
      dateAdded: new Date()
    })
  );
}

export default Route.extend({
  model() {
    return 'todo-item';
  }
});
