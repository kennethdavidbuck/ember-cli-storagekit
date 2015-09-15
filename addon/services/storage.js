import Ember from 'ember';

/*global window, JSON*/

const {isPresent, merge} = Ember;

export default Ember.Service.extend({

  /**
   * Global environment object
   * @property global
   */
  global: window,

  /**
   * Namespace to prepend to each stored key, separated by a colon (:).
   *
   * Ex.
   *
   * ```javascript
   *  'my-namespace:my-key'
   * ```
   * @property {String} namespace
   * @default ""
   */
  namespace: '',

  /**
   * The default storage driver to use when none is specified.
   * @property {String} driver
   * @default 'local'
   */
  driver: 'local',

  /**
   * Set an item into storage.
   * @method setItem
   * @param {String} key The key to store the value under.
   * @param {*} value The value to be stored. The value will be stringified.
   * @param {Object} options The options object for specified additional parameters such as storage type.
   */
  setItem(key, value, options) {
    this._getDriver(options).setItem(this.namespaceKey(key), JSON.stringify(value));
  },

  /**
   * Get an item from storage.
   * @method getItem
   * @param {String} key The key to use for value retrieval.
   * @param {Object} options The options object for specified additional parameters such as storage type.
   */
  getItem(key, options) {
    let value = this._getDriver(options).getItem(this.namespaceKey(key));

    if (isPresent(value)) {
      value = JSON.parse(value);
    }

    return value;
  },

  /**
   * Remove an item from storage.
   * @method removeItem
   * @param {String} key The key for the value to remove from storage.
   * @param {Object} options The options object for specified additional parameters such as storage type.
   */
  removeItem(key, options) {
    this._getDriver(options).removeItem(this.namespaceKey(key));
  },

  /**
   * @method namespaceKey
   * @param {String} key A key to be namespaced.
   * @private
   */
  namespaceKey(key) {
    const namespace = this.get('namespace');
    return namespace !== false && isPresent(namespace) ? `${namespace}:${key}` : key;
  },

  /**
   * Clear everything in storage.
   * @method clear
   */
  clear(options) {
    this._getDriver(options).clear();
  },

  /**
   * Fetches a specified storage type, or returns the specified default storage when none is specified.
   * The current types are: local, session, object.
   * Note: Gracefully degrades to object storage
   * @method _getStorageType
   * @private
   * @param options
   */
  _getDriver(options) {
    options = merge({
      driver: this.get('driver')
    }, options || {});

    if(this.get('hasStorageSupport')) {
      switch (options.driver) {
        case 'local':
          return this.get('global').localStorage;
        case 'session':
          return this.get('global').sessionStorage;
      }
    }

    return this.get('objectStorage');
  },

  /**
   * Used for non-persistent storage. This data will disappear as soon as the app is destroyed.
   * @property {Ember.Object} objectStorage
   */
  objectStorage: Ember.Object.create({
    data: Ember.Map.create({}),
    setItem(key, value) {
      this.get('data').set(key, value);
    },
    getItem(key) {
      return this.get('data').get(key);
    },
    removeItem(key){
      this.get('data').delete(key);
    },
    clear() {
      this.get('data').clear();
    }
  }),

  /**
   * Whether or not the current environment supports either local or session storage.
   * @property {Boolean} supportsLocalAndSessionStorage
   */
  hasStorageSupport: Ember.computed(function () {
    try {
      const _global = this.get('global');
      return 'localStorage' in _global && _global['localStorage'] !== null;
    } catch(e) {
      return false;
    }
  })
});
