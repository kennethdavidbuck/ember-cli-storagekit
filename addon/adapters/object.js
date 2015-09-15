import Ember from 'ember';

/*global JSON*/

const {isPresent} = Ember;

export default Ember.Object.extend({

  /**
   *
   */
  storage: Ember.Map.create(),

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
   * @method namespaceKey
   * @param {String} key A key to be namespaced.
   * @private
   */
  buildNamespace(key) {
    const namespace = this.get('namespace');
    return namespace !== false && isPresent(namespace) ? `${namespace}:${key}` : key;
  },

  /**
   *
   */
  setItem(key, value) {
    this.get('storage').set(this.buildNamespace(key), JSON.stringify(value));
  },

  /**
   *
   */
  getItem(key) {
    let value = this.get('storage').get(this.buildNamespace(key));

    if (isPresent(value)) {
      value = JSON.parse(value);
    }

    return value;
  },

  /**
   *
   */
  removeItem(key){
    this.get('storage').delete(this.buildNamespace(key));
  },

  /**
   *
   */
  clear() {
    this.get('storage').clear();
  },

  /**
   *
   */
  length() {
    return this.get('storage.size');
  }
});
