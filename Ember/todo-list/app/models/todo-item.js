import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  label: DS.attr('string'),
  done: DS.attr('boolean', { defaultValue: false }),
  dateAdded: DS.attr('date'),

  dateTimeString: computed('dateAdded', function () {
    return `${this.dateAdded.toLocaleDateString(window.navigator.language)} ${this.dateAdded.getHours()}:${this.dateAdded.getMinutes()}`;
  })
});
