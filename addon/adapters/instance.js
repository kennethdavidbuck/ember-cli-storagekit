import AbstractAdapter from './abstract';
import Ember from 'ember';

const {RSVP} = Ember;
const {Promise} = RSVP;

/**
 * @module ember-cli-storagekit
 * @submodule adapters
 */

/**
 * @class InstanceAdapter
 * @extends EmberCliStoragekit.AbstractAdapter
 * @requires Ember.Map
 * @public
 */

export default AbstractAdapter.extend({

  storage: Ember.computed(function () {
    return Ember.Map.create();
  }).readOnly(),

  /**
   * @override
   */
  setItem(key, value) {
    this.get('storage').set(this.buildNamespace(key), this.get('serializer').serialize(value));

    return Promise.resolve();
  },

  /**
   * @override
   */
  getItem(key) {
    const item = this.get('serializer').deserialize(this.get('storage').get(this.buildNamespace(key)));

    return Promise.resolve(item);
  },

  /**
   * @override
   */
  removeItem(key){
    this.get('storage').delete(this.buildNamespace(key));

    return Promise.resolve();
  },

  /**
   * @override
   */
  keys() {
    const keys = [];

    this.get('storage').forEach((value, key) => {
      if(this.isNamespaced(key)) {
        keys.push(this.stripNamespace(key));
      }
    });

    return Promise.resolve(Ember.A(keys.sort()));
  },

  /**
   * @override
   */
  clear() {
    return this.keys().then(keys => RSVP.all(
      keys.map(key => this.removeItem(key)))
    );
  }
});
