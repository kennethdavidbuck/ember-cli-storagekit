import Ember from 'ember';

const {isPresent, isBlank} = Ember;

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
   * @property {string} namespace
   * @default ""
   */
  namespace: '',

  /**
   * @property {string} _namespace
   * @private
   */
  _namespace: Ember.computed('namespace', function () {
    let namespace = this.get('namespace');

    const owner = Ember.getOwner(this);

    if(isBlank(namespace) && owner) {
      const env = owner.lookup('application:main');

      if(env.hasOwnProperty('storagekit')) {
        namespace = env.storagekit.namespace;
      }
    }

    return namespace || '';
  }),

  /**
   * @method namespaceKey
   * @param {string} key A key to be namespaced.
   * @public
   */
  buildNamespace(key) {
    const namespace = this.get('_namespace');
    return isPresent(namespace) ? `${namespace}:${key}` : `${key}`;
  },

  /**
   * strips the namespace from a namespaced key
   * @method stripNamespace
   * @param {string} key A namespaced key to be stripped
   * @return {string} The key with its namespace removed
   * @public
   */
  stripNamespace(key) {
    Ember.assert(`${key} is not a namespaced key`, this.isNamespaced(key));

    return `${key}`.slice(this.buildNamespace('').length);
  },

  /**
   * Determines whether or not a provided key is namespaced.
   * @method isNamespaced
   * @param {string} key The key to check the namespace status of.
   * @return {boolean}
   * @public
   */
  isNamespaced(key) {
    return `${key}`.indexOf(this.buildNamespace('')) === 0;
  },

  /**
   * Determines whether or not a provided key is namespaced.
   * @method isNamespacedKey
   * @param {string} key The key to check the namespace status of.
   * @return {boolean}
   * @public
   * @deprecated please use #isNamespaced instead.
   */
  isNamespacedKey(key) {
    return this.isNamespaced(key);
  }
});
