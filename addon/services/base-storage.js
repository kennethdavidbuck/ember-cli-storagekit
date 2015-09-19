import Ember from 'ember';

/**
 * @module ember-cli-storagekit
 * @submodule adapters
 */

/**
 * @class BaseStorage
 * @namespace EmberCliStoragekit
 * @extends Ember.Service
 * @public
 */

export default Ember.Service.extend({

  /**
   * @property {*} adapter
   */
  adapter: null,

  /**
   * @method setItem
   * @public
   */
  setItem(key, value) {
    this.get('adapter').setItem(key, value);
  },

  /**
   * @method getItem
   * @public
   */
  getItem(key) {
    return this.get('adapter').getItem(key);
  },

  /**
   * @method removeItem
   * @public
   */
  removeItem(key) {
    this.get('adapter').removeItem(key);
  },

  /**
   * @method clear
   * @public
   */
  clear() {
    this.get('adapter').clear();
  },

  /**
   * @method length
   * @public
   */
  length() {
    return this.get('adapter').length();
  }
});
