import AbstractAdapter from './abstract';

/*global window*/

/**
 * @module ember-cli-storagekit
 * @submodule adapters
 */

/**
 * @class LocalAdapter
 * @extends EmberCliStoragekit.AbstractAdapter
 * @public
 */

export default AbstractAdapter.extend({
  storage: window.localStorage
});
