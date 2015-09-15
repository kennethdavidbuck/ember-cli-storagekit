import Ember from 'ember';

/*global window*/

export default Ember.Object.extend({

  storage: window.localStorage,

  setItem(key, value) {
    this.get('storage').setItem(key, value);
  },
  getItem(key) {
    return this.get('storage').getItem(key);
  },
  removeItem(key) {
    this.get('storage').removeItem(key);
  },
  clear() {
    this.get('storage').clear();
  },
  length() {
    return this.get('storage.length');
  }
});
