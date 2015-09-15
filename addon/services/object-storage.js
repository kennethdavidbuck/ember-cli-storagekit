import Ember from 'ember';
import ObjectAdapter from '../adapters/object';

/*global JSON*/

const {isPresent} = Ember;

export default Ember.Service.extend({

  /**
   *s @property adapter
   */
  adapter: ObjectAdapter.create(),

  /**
   * Namespace to prepend to each stored key, separated by a colon (:).
   *
   * Ex.
   *
   * ```javascript
   *  'my-namespace:my-key'
   * ```
   * @property {String} namespace
   * @default ""
   */
  namespace: '',

  /**
   * Set an item into storage.
   * @method setItem
   * @param {String} key The key to store the value under.
   * @param {*} value The value to be stored. The value will be stringified.
   * @param {Object} options The options object for specified additional parameters such as storage type.
   */
  setItem(key, value) {
    this.get('adapter').setItem(key, value);
  },

  /**
   * Get an item from storage.
   * @method getItem
   * @param {String} key The key to use for value retrieval.
   * @param {Object} options The options object for specified additional parameters such as storage type.
   */
  getItem(key) {
    return this.get('adapter').getItem(key);
  },

  /**
   * Remove an item from storage.
   * @method removeItem
   * @param {String} key The key for the value to remove from storage.
   * @param {Object} options The options object for specified additional parameters such as storage type.
   */
  removeItem(key) {
    this.get('adapter').removeItem(key);
  },

  /**
   * @method namespaceKey
   * @param {String} key A key to be namespaced.
   * @private
   */
  namespaceKey(key) {
    const namespace = this.get('namespace');
    return namespace !== false && isPresent(namespace) ? `${namespace}:${key}` : key;
  },

  /**
   * Clear everything in storage.
   * @method clear
   */
  clear() {
    this.get('adapter').clear();
  },

  /**
   *
   */
  length() {
    return this.get('adapter').length();
  }
});
