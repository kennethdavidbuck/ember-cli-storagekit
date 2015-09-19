import Ember from 'ember';

/*global window*/

/**
 * @module ember-cli-storagekit
 * @submodule utilities
 */

/**
 * @class StorageSupportUtility
 * @namespace EmberCliStoragekit
 * @extends Ember.Namespace
 * @public
 */

export default Ember.Namespace.create({

  /**
   * @property {*} global
   * @private
   */
  global: window,

  /**
   * @method has
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
