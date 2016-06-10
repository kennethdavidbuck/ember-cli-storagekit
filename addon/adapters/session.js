import AbstractAdapter from './abstract';

const {computed} = Ember;

/*global window*/

/**
 * @module ember-cli-storagekit
 * @submodule adapters
 */

/**
 * @class SessionAdapter
 * @extends EmberCliStoragekit.AbstractAdapter
 * @public
 */

export default AbstractAdapter.extend({
  storage: computed(function () {
    return window.sessionStorage;
  }).readOnly()
});
