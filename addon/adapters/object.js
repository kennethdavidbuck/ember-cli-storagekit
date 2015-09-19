import BuildNamespaceMixin from '../mixins/build-namespace';
import Ember from 'ember';

/**
 * @module ember-cli-storagekit
 * @submodule adapters
 */

/**
 * @class ObjectAdapter
 * @namespace EmberCliStoragekit
 * @extends Ember.Object
 * @uses EmberCliStoragekit/Mixins/BuildNamespace
 * @public
 */

export default Ember.Object.extend(BuildNamespaceMixin, {

  /**
   * @property {Ember.Map} storage
   */
  storage: Ember.Map.create(),

  /**
   * @property {*} serializer
   */
  serializer: null,

  /**
   * @method setItem
   * @public
   */
  setItem(key, value) {
    this.get('storage').set(this.buildNamespace(key), this.get('serializer').serialize(value));
  },

  /**
   * @method getItem
   * @public
   */
  getItem(key) {
    return this.get('serializer').deserialize(this.get('storage').get(this.buildNamespace(key)));
  },

  /**
   * @method removeItem
   * @public
   */
  removeItem(key){
    this.get('storage').delete(this.buildNamespace(key));
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
    return this.get('storage.size');
  }
});
