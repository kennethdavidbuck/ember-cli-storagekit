import AbstractAdapter from './abstract';

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
  storage: window.sessionStorage
});
