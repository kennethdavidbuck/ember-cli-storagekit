import Ember from 'ember';

/**
 * @module ember-cli-storagekit
 * @submodule services
 */

/**
 * @class BaseStorageService
 * @extends Ember.Service
 * @public
 */

export default Ember.Service.extend({

  /**
   * The adapter being delegated to
   * @property {*} adapter
   * @private
   */
  adapter: null,

  /**
   * Delegates a setItem call to the underlying storage source
   * @method setItem
   * @param {string} key
   * @param {*} value
   * @public
   */
  setItem(key, value) {
    return this.get('adapter').setItem(key, value);
  },

  /**
   * Delegates a getItem call to the underlying storage source
   * @method getItem
   * @param {string} key
   * @public
   */
  getItem(key) {
    return this.get('adapter').getItem(key);
  },

  /**
   * Delegates a removeItem call to the underlying storage source
   * @method removeItem
   * @param {string} key
   * @public
   */
  removeItem(key) {
    return this.get('adapter').removeItem(key);
  },

  /**
   * Delegates a key call to the underlying storage source.
   * @method key
   * @param {Number} index The index of the key to retrieve.
   * @return {string|null} The key at the given index or null if it does not exist.
   */
  key(index) {
    return this.get('adapter').key(index);
  },

  /**
   * Delegates a keys call to the underlying storage source
   */
  keys() {
    return this.get('adapter').keys();
  },

  /**
   * Clears the underlying storage source
   * @method clear
   * @public
   */
  clear() {
    return this.get('adapter').clear();
  },

  /**
   * Delegates a length call the underlying storage source
   * @method length
   * @public
   */
  length() {
    return this.get('adapter').length();
  }
});
