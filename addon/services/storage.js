import Ember from 'ember';
import LocalStorageService from './local-storage';
import ObjectStorageService from './object-storage';
import SessionStorageService from './session-storage';

export default Ember.Service.extend({

  /**
   * @property local
   */
  local: LocalStorageService.create(),

  /**
   * @property session
   */
  session: SessionStorageService.create(),

  /**
   * @property object
   */
  object: ObjectStorageService.create()
});
