import Ember from 'ember';

/**
 * @module ember-cli-storagekit
 * @submodule services
 */

/**
 * @class StorageService
 * @namespace EmberCliStoragekit
 * @extends Ember.Service
 * @public
 */

export default Ember.Service.extend({

  /**
   * @property local
   */
  local: null,

  /**
   * @property session
   */
  session: null,

  /**
   * @property object
   */
  object: null
});
