import Ember from 'ember';

/**
 * @module ember-cli-storagekit
 * @submodule services
 */

/**
 * Storage Service acts a container for housing each storage service type that is available.
 * @class StorageService
 * @extends Ember.Service
 * @public
 */

export default Ember.Service.extend({

  /**
   * a localStorage service object
   * @property {EmberCliStoragekit.LocalStorageService} local
   */
  local: null,

  /**
   * a sessionStorage service object
   * @property {EmberCliStoragekit.SessionStorageService} session
   */
  session: null,

  /**
   * an objectStorage service instance.
   * @property {EmberCliStoragekit.InstanceStorageService} instance
   */
  instance: null
});
