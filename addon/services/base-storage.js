import Ember from 'ember';

export default Ember.Service.extend({

  setItem(key, value) {
    this.get('adapter').setItem(key, value);
  },

  getItem(key) {
    return this.get('adapter').getItem(key);
  },

  removeItem(key) {
    this.get('adapter').removeItem(key);
  },

  clear() {
    this.get('adapter').clear();
  },

  length() {
    return this.get('adapter').length();
  }
});
