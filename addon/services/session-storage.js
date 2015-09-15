import Ember from 'ember';
import SessionAdapter from '../adapters/session';

export default Ember.Service.extend({

  adapter: SessionAdapter.create(),

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
