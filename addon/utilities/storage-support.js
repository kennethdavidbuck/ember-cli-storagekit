import Ember from 'ember';

/*global window*/

/**
 * @module ember-cli-storagekit
 * @submodule utilities
 */

/**
 * @class StorageSupportUtility
 * @extends Ember.Namespace
 * @public
 */

export default Ember.Namespace.create({

  /**
   * The environment global object (ex. window)
   * @property {*} global
   * @private
   */
  global: window,

  /**
   * Determines whether or not the current environment has support for a given type of storage.
   * ex. localStorage, sessionStorage
   * @method has
   * @param {String} type The storage type to be checked for support in the current environment.
   * @return {Boolean} Whether or not the given storage type is supported.
   * @public
   */
  has(type) {
    const _global = this.get('global');
    try {
      return type in _global && _global[type] !== null;
    } catch (e) {
      return false;
    }
  }
});
