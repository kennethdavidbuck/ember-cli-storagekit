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
   * @property {String} namespace
   * @default ""
   */
  namespace: '',

  /**
   * @property {String} _namespace
   * @private
   */
  _namespace: Ember.computed('namespace', function () {
    let namespace = this.get('namespace');

    if(isBlank(namespace) && this.container) {
      const env = this.container.lookupFactory('config:environment');

      if(env.hasOwnProperty('APP') && env.APP.hasOwnProperty('storagekit')) {
        namespace = env.APP.storagekit.namespace;
      }
    }

    return namespace || '';
  }),

  /**
   * @method namespaceKey
   * @param {String} key A key to be namespaced.
   * @public
   */
  buildNamespace(key) {
    const namespace = this.get('_namespace');
    return isPresent(namespace) ? `${this.get('_namespace')}:${key}` : key;
  }
});
