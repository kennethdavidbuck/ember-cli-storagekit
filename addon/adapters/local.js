import BuildNamespaceMixin from '../mixins/build-namespace';
import Ember from 'ember';

/*global window*/

/**
 * @module ember-cli-storagekit
 * @submodule adapters
 */

/**
 * @class LocalAdapter
 * @extends Ember.Object
 * @uses EmberCliStoragekit/Mixins/BuildNamespace
 * @public
 */

export default Ember.Object.extend(BuildNamespaceMixin, {

  /**
   * @property {window.localStorage} storage
   * @private
   */
  storage: window.localStorage,

  /**
   * The serializer to use when storing values into localStorage
   * @property {*} serializer
   * @private
   */
  serializer: null,

  /**
   * Sets a value into localStorage under a provided key
   * @method setItem
   * @param {String} key The key name to store the given value under
   * @param {*} value A value to store under a specified key
   * @public
   */
  setItem(key, value) {
    this.get('storage').setItem(this.buildNamespace(key), this.get('serializer').serialize(value));
  },

  /**
   * Gets a value from localStorage based on a given key
   * @method getItem
   * @param {String} key The key to use when retrieving a value from localStorage
   * @return The value retrieved from localStorage based on the given key
   * @public
   */
  getItem(key) {
    return this.get('serializer').deserialize(this.get('storage').getItem(this.buildNamespace(key)));
  },

  /**
   * Removes a value from localStorage using a given key
   * @method removeItem
   * @param {String} key The key/value to remove from localStorage
   * @public
   */
  removeItem(key){
    this.get('storage').removeItem(this.buildNamespace(key));
  },

  /**
   * Clears all key/value pairs from localStorage
   * @method clear
   * @public
   */
  clear() {
    this.get('storage').clear();
  },

  /**
   * The current length/number of items in localStorage
   * @method length
   * @return {Number} The number of items in localStorage
   * @public
   */
  length() {
    return this.get('storage.length');
  }
});
