import Ember from 'ember';
import LocalAdapter from '../adapters/local';

export default Ember.Service.extend({

  adapter: LocalAdapter.create(),

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
