import Ember from 'ember';

const {isPresent} = Ember;

/**
 * @module ember-cli-storagekit
 * @submodule mixins
 */

export default Ember.Mixin.create({

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
   * @public
   */
  buildNamespace(key) {
    const namespace = this.get('namespace');
    return namespace !== false && isPresent(namespace) ? `${namespace}:${key}` : key;
  }
});
