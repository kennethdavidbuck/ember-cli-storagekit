import Ember from 'ember';
import ObjectAdapter from '../adapters/object';

/*global JSON*/

const {isPresent} = Ember;

export default Ember.Service.extend({

  adapter: ObjectAdapter.create(),

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
