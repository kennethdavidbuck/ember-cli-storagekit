import AbstractAdapter from './abstract';
import Ember from 'ember';

const {merge} = Ember;

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
  }),

  /**
   * @override
   */
  setItem(key, value) {
    this.get('storage').set(this.buildNamespace(key), this.get('serializer').serialize(value));
  },

  /**
   * @override
   */
  getItem(key) {
    return this.get('serializer').deserialize(this.get('storage').get(this.buildNamespace(key)));
  },

  /**
   * @override
   */
  removeItem(key){
    this.get('storage').delete(this.buildNamespace(key));
  },

  /**
   * @override
   */
  keys(options) {
    const keys = [];
    const _options = merge({
      global: false
    }, options || {});

    this.get('storage').forEach((value, key) => {
      if(_options.global || this.isNamespaced(key)) {
        keys.push(key);
      }
    });

    return keys.map(key => this.stripNamespace(key)).sort();
  },

  /**
   * @override
   */
  clear(options) {
    this.keys(options).forEach((key) => {
      this.removeItem(key);
    });
  }
});
