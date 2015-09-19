import Ember from 'ember';

/*global JSON*/

const {isPresent} = Ember;

/**
 * @module ember-cli-storagekit
 * @submodule serializers
 */

/**
 * @class Json
 * @namespace EmberCliStoragekit
 * @extends Ember.Object
 * @public
 */

export default Ember.Object.extend({

  /**
   * @method serialize
   * @public
   */
  serialize(value) {
    return JSON.stringify(value);
  },

  /**
   * @method deserialize
   * @public
   */
  deserialize(value) {
    if (isPresent(value)) {
      value = JSON.parse(value);
    }

    return value;
  }
});
