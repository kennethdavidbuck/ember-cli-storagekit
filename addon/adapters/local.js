import AbstractAdapter from './abstract';
import Ember from 'ember';

const {computed} = Ember;

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
  storage: computed(function () {
    return window.localStorage;
  }).readOnly()
});
