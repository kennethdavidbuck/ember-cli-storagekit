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
   * @return {boolean} Whether or not the given storage type is supported.
   * @public
   */
  has(type) {
    let _global = this.get('global');

    try {
      const supports = type in _global && _global[type] !== null;

      const randomHash = '946d4feb0eac1298f72834168f4dffb2';

      if(supports) {
        // Firefox will still throw an error even if localStorage is present, but the user does not allow storage.
        // We make a call to a random getItem in order to throw the error in a controller manner, and return false.
        _global[type].getItem(randomHash);

        // Safari will only throw on setItem() in private mode - see: http://gist.github.com/paulirish/5558557
        _global[type].setItem(randomHash, randomHash);
        _global[type].removeItem(randomHash);
      }
      return supports;
    } catch (e) {
      return false;
    }
  }
});
