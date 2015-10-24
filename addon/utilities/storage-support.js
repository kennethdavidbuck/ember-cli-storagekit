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
      // credit: https://gist.github.com/paulirish/5558557
      const randomMD5 = '11b346184d30d120750d1485e0393812';

      _global[type].setItem(randomMD5, randomMD5);
      _global[type].getItem(randomMD5);

      return true;
    } catch (e) {
      return false;
    }
  }
});
