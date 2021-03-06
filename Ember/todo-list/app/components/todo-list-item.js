import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['list-group-item'],
  classNameBindings: ['isDone'],
  isDone: computed('item.done', function() {
    return this.get('item.done') ? 'list-group-item-success' : '';
  }),
  actions: {
    remove(id) {
      this.get('remove-action')(id)
    },

    done(id) {
      this.get('complete-action')(id)
    }
  }


});
