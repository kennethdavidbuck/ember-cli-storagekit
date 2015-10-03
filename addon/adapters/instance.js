import AbstractAdapter from './abstract';
import Ember from 'ember';

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

  key(index) {
    const keys = [];

    this.get('storage').forEach((value, key) => {
      keys.push(key);
    });

    return keys.sort()[index] || null;
  },

  length() {
    return this.get('storage.size');
  }
});
