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

  setItem(key, value) {
    this.get('storage').set(this.buildNamespace(key), this.get('serializer').serialize(value));
  },

  getItem(key) {
    return this.get('serializer').deserialize(this.get('storage').get(this.buildNamespace(key)));
  },

  removeItem(key){
    this.get('storage').delete(this.buildNamespace(key));
  },

  keys(options) {
    const keys = [];
    const _options = merge({
      global: false
    }, options || {});

    this.get('storage').forEach((value, key) => {
      if(_options.global || this.isNamespacedKey(key)) {
        keys.push(key);
      }
    });

    return keys.sort();
  },

  clear(options) {
    const storage = this.get('storage');

    this.keys(options).forEach((key) => {
      storage.delete(key);
    });
  }
});
