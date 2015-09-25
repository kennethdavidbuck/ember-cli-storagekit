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
   * @param {String} key
   * @param {*} value
   * @public
   */
  setItem(key, value) {
    this.get('adapter').setItem(key, value);
  },

  /**
   * Delegates a getItem call to the underlying storage source
   * @method getItem
   * @param {String} key
   * @public
   */
  getItem(key) {
    return this.get('adapter').getItem(key);
  },

  /**
   * Delegates a removeItem call to the underlying storage source
   * @method removeItem
   * @param {String} key
   * @public
   */
  removeItem(key) {
    this.get('adapter').removeItem(key);
  },

  /**
   * Delegates a key call to the underlying storage source.
   * @method key
   * @param {Number} index The index of the key to retrieve.
   * @return {String|null} The key at the given index or null if it does not exist.
   */
  key(index) {
    return this.get('adapter').key(index);
  },

  /**
   * Clears the underlying storage source
   * @method clear
   * @public
   */
  clear() {
    this.get('adapter').clear();
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
