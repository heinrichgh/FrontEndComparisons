import Component from '@ember/component';
import {inject} from '@ember/service';

export default Component.extend({

  didReceiveAttrs() {
    this.storeType = this.get('items-store');
    this.items = this.store.findAll(this.storeType);
  },

  store: inject('store'),
  newItemValue: "",
  actions: {
    addItem() {
      this.store.createRecord(this.storeType, {
        label: this.newItemValue,
        dateAdded: new Date()
      }).save();
      this.set('newItemValue', "");
    },

    removeItem(id) {
      this.store.findRecord(this.storeType, id, { backgroundReload: false }).then(function(item) {
        item.destroyRecord();
      });
    },

    completeItem(id) {
      this.store.findRecord(this.storeType, id).then(function(item) {
        item.set('done', true);
        item.save();
      });
    }
  }
});
