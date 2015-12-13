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

    return new Ember.RSVP.Promise((resolve) => {
      resolve();
    });
  },

  /**
   * @override
   */
  getItem(key) {
    const item = this.get('serializer').deserialize(this.get('storage').get(this.buildNamespace(key)));

    return new Ember.RSVP.Promise((resolve) => {
      resolve(item);
    });
  },

  /**
   * @override
   */
  removeItem(key){
    this.get('storage').delete(this.buildNamespace(key));

    return new Ember.RSVP.Promise((resolve) => {
      resolve();
    });
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
      if(_options.global || this.isNamespacedKey(key)) {
        keys.push(key);
      }
    });

    return new Ember.RSVP.Promise((resolve) => {
      resolve(keys.sort());
    });
  },

  /**
   * @override
   */
  clear(options) {
    const storage = this.get('storage');
    const promises = [];

    return new Ember.RSVP.Promise((resolve) => {
      this.keys(options).then((keys) => {
        keys.forEach((key) => {
          promises.push(storage.delete(key));
        });

        new Ember.RSVP.all(promises).then(() => {
          resolve();
        });
      });
    });
  }
});
