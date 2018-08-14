import Route from '@ember/routing/route';
import EmberObject, {computed} from '@ember/object';

const Item = EmberObject.extend({
  label: "",
  done: true,
  dateAdded: null,

  dateTimeString: computed('dateAdded', function () {
    return `${this.dateAdded.toLocaleDateString(window.navigator.language)} ${this.dateAdded.getHours()}:${this.dateAdded.getMinutes()}`;
  })
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
    return todoList;
  }
});
