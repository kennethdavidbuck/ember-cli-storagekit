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
   * @param {string} key The key name to store the given value under
   * @param {*} value A value to store under a specified key
   * @public
   */
  setItem(key, value) {
    this.get('storage').setItem(this.buildNamespace(key), this.get('serializer').serialize(value));
  },

  /**
   * Gets a value from storage based on a given key
   * @method getItem
   * @param {string} key The key to use when retrieving a value from storage
   * @return The value retrieved from storage based on the given key
   * @public
   */
  getItem(key) {
    return this.get('serializer').deserialize(this.get('storage').getItem(this.buildNamespace(key)));
  },

  /**
   * Removes a value from storage using a given key
   * @method removeItem
   * @param {string} key The key/value to remove from storage
   * @public
   */
  removeItem(key){
    this.get('storage').removeItem(this.buildNamespace(key));
  },

  /**
   * @method key
   */
  key(index) {
    return this.keys()[index] || null;
  },

  /**
   * Returns all the keys that are currently in the storage "world" in sorted order
   * (where the namespace defines the world boundary).
   * @method keys
   * @public
   */
  keys() {
    return Object.keys(this.get('storage'))
      .filter(key => this.isNamespaced(key))
      .map(key => this.stripNamespace(key))
      .sort();
  },

  /**
   * Clears all key/value pairs from storage
   * @method clear
   * @public
   */
  clear() {
    this.keys().forEach(key => this.removeItem(key));
  },

  /**
   * The current length/number of items in storage
   * @method length
   * @return {Number} The number of items in storage
   * @public
   */
  length() {
    return this.keys().length;
  }
});
