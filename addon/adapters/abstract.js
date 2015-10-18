import BuildNamespaceMixin from '../mixins/build-namespace';
import Ember from 'ember';

/**
 * @module ember-cli-storagekit
 * @submodule adapters
 */

/**
 * @class BaseAdapter
 * @extends Ember.Object
 * @uses EmberCliStoragekit/Mixins/BuildNamespace
 * @public
 */

export default Ember.Object.extend(BuildNamespaceMixin, {

  /**
   * @property {*} storage The storage service to delegate to
   * @private
   */
  storage: null,

  /**
   * The serializer to use when storing values into storage
   * @property {*} serializer
   * @private
   */
  serializer: null,

  /**
   * Sets a value into storage under a provided key
   * @method setItem
   * @param {String} key The key name to store the given value under
   * @param {*} value A value to store under a specified key
   * @public
   */
  setItem(key, value) {
    this.get('storage').setItem(this.buildNamespace(key), this.get('serializer').serialize(value));
  },

  /**
   * Gets a value from storage based on a given key
   * @method getItem
   * @param {String} key The key to use when retrieving a value from storage
   * @return The value retrieved from storage based on the given key
   * @public
   */
  getItem(key) {
    return this.get('serializer').deserialize(this.get('storage').getItem(this.buildNamespace(key)));
  },

  /**
   * Removes a value from storage using a given key
   * @method removeItem
   * @param {String} key The key/value to remove from storage
   * @public
   */
  removeItem(key){
    this.get('storage').removeItem(this.buildNamespace(key));
  },

  /**
   * @method key
   */
  key(index) {
    return this.get('storage').key(index);
  },

  /**
   * Returns all the keys that are currently in storage in sorted order.
   * @method keys
   * @public
   */
  keys() {
    return Object.keys(this.get('storage')).sort();
  },

  /**
   * Clears all key/value pairs from storage
   * @method clear
   * @public
   */
  clear() {
    this.get('storage').clear();
  },

  /**
   * The current length/number of items in storage
   * @method length
   * @return {Number} The number of items in storage
   * @public
   */
  length() {
    return this.get('storage.length');
  }
});
