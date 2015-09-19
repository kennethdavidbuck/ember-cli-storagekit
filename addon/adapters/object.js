import BuildNamespaceMixin from '../mixins/build-namespace';
import Ember from 'ember';

/**
 * @module ember-cli-storagekit
 * @submodule adapters
 */

/**
 * @class ObjectAdapter
 * @namespace EmberCliStoragekit
 * @extends Ember.Object
 * @uses EmberCliStoragekit/Mixins/BuildNamespace
 * @public
 */

export default Ember.Object.extend(BuildNamespaceMixin, {

  /**
   * @property {Ember.Map} storage
   * @private
   */
  storage: Ember.Map.create(),

  /**
   * The serializer to use when storing values into objectStorage
   * @property {*} serializer
   * @private
   */
  serializer: null,

  /**
   * Sets an value into objectStorage under a provided key
   * @method setItem
   * @param {String} key The key name to store the given value under
   * @param {*} value A value to store under a specified key
   * @public
   */
  setItem(key, value) {
    this.get('storage').set(this.buildNamespace(key), this.get('serializer').serialize(value));
  },

  /**
   * Gets a value from objectStorage based on a given key
   * @method getItem
   * @param {String} key The key to use when retrieving a value from objectStorage
   * @return The value retrieved from objectStorage based on the given key
   * @public
   */
  getItem(key) {
    return this.get('serializer').deserialize(this.get('storage').get(this.buildNamespace(key)));
  },

  /**
   * Removes a value from objectStorage using a given key
   * @method removeItem
   * @param {String} key The key/value to remove from objectStorage
   * @public
   */
  removeItem(key){
    this.get('storage').delete(this.buildNamespace(key));
  },

  /**
   * Clears all key/value pairs from objectStorage
   * @method clear
   * @public
   */
  clear() {
    this.get('storage').clear();
  },

  /**
   * The current length/number of items in objectStorage
   * @method length
   * @return {Number} The number of items in objectStorage
   * @public
   */
  length() {
    return this.get('storage.size');
  }
});
