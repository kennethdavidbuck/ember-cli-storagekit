import BuildNamespaceMixin from '../mixins/build-namespace';
import Ember from 'ember';

const {RSVP} = Ember;
const {Promise} = RSVP;

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
   * @return {Promise}
   * @public
   */
  setItem(key, value) {
    this.get('storage').setItem(this.buildNamespace(key), this.get('serializer').serialize(value));

    return Promise.resolve();
  },

  /**
   * Gets a value from storage based on a given key
   * @method getItem
   * @param {String} key The key to use when retrieving a value from storage
   * @return {Promise} The value retrieved from storage based on the given key
   * @public
   */
  getItem(key) {
    const item = this.get('serializer').deserialize(this.get('storage').getItem(this.buildNamespace(key)));

    return Promise.resolve(item);
  },

  /**
   * Removes a value from storage using a given key
   * @method removeItem
   * @param {String} key The key/value to remove from storage
   * @return {Promise}
   * @public
   */
  removeItem(key) {
    this.get('storage').removeItem(this.buildNamespace(key));

    return Promise.resolve();
  },

  /**
   * @method key
   */
  key(index) {
     return this.keys().then(keys => keys[index] || null);
  },

  /**
   * Returns all the keys that are currently in the storage "world" in sorted order
   * (where the namespace defines the world boundary).
   * @method keys
   * @return Promise.<[string]>
   * @public
   */
  keys() {
    const keys = Object.keys(this.get('storage'))
      .filter(key => this.isNamespaced(key))
      .map(key => this.stripNamespace(key))
      .sort();

    return Promise.resolve(Ember.A(keys));
  },

  /**
   * Clears all key/value pairs from storage
   * @method clear
   * @return {Promise}
   * @public
   */
  clear() {
    return this.keys().then(keys => RSVP.all(
      keys.map(key => this.removeItem(key)))
    );
  },

  /**
   * The current length/number of items in storage
   * @method length
   * @method {Object} options
   * @return {Promise.<number>} The number of items in storage
   * @public
   */
  length() {
    return this.keys().then(keys => keys.length);
  }
});
