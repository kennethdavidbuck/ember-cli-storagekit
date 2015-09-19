import BuildNamespaceMixin from '../mixins/build-namespace';
import Ember from 'ember';

/*global window*/

/**
 * @module ember-cli-storagekit
 * @submodule adapters
 */

/**
 * @class LocalAdapter
 * @namespace EmberCliStoragekit
 * @extends Ember.Object
 * @uses EmberCliStoragekit/Mixins/BuildNamespace
 * @public
 */

export default Ember.Object.extend(BuildNamespaceMixin, {

  /**
   * @property {*} storage
   */
  storage: window.localStorage,

  /**
   * @property {*} serializer
   */
  serializer: null,

  /**
   * @method setItem
   * @public
   */
  setItem(key, value) {
    this.get('storage').setItem(this.buildNamespace(key), this.get('serializer').serialize(value));
  },

  /**
   * @method getItem
   * @public
   */
  getItem(key) {
    return this.get('serializer').deserialize(this.get('storage').getItem(this.buildNamespace(key)));
  },

  /**
   * @method removeItem
   * @public
   */
  removeItem(key){
    this.get('storage').removeItem(this.buildNamespace(key));
  },

  /**
   * @method clear
   * @public
   */
  clear() {
    this.get('storage').clear();
  },

  /**
   * @method length
   * @public
   */
  length() {
    return this.get('storage.length');
  }
});
