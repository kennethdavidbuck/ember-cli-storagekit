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
    this.getDriver(options).setItem(this.namespaceKey(key), JSON.stringify(value));
  },

  /**
   * Get an item from storage.
   * @method getItem
   * @param {String} key The key to use for value retrieval.
   * @param {Object} options The options object for specified additional parameters such as storage type.
   */
  getItem(key, options) {
    let value = this.getDriver(options).getItem(this.namespaceKey(key));

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
    this.getDriver(options).removeItem(this.namespaceKey(key));
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
    this.getDriver(options).clear();
  },

  /**
   *
   */
  length(options) {
    return this.getDriver(options).length();
  },

  /**
   * Fetches a specified storage driver, or returns the specified default storage when none is specified.
   * The current types are: local, session, object.
   * Note: Gracefully degrades to object storage
   * @method getDriver
   * @param options
   * @private
   */
  getDriver(options) {
    options = merge({
      driver: this.get('driver')
    }, options || {});

    if(this.get('hasStorageSupport')) {
      switch (options.driver) {
        case 'local':
          return this.get('localStorage');
        case 'session':
          return this.get('sessionStorage');
      }
    }

    return this.get('objectStorage');
  },

  /**
   * Thin wrapper over localStorage
   * @property localStorage
   */
  localStorage: Ember.computed(function () {
    return Ember.Object.create({
      storage: this.get('global.localStorage'),
      setItem(key, value) {
        this.get('storage').setItem(key, value);
      },
      getItem(key) {
        return this.get('storage').getItem(key);
      },
      removeItem(key) {
        this.get('storage').removeItem(key);
      },
      clear() {
        this.get('storage').clear();
      },
      length() {
        return this.get('storage').length;
      }
    });
  }),
  /**
   * Thin wrapper over sessionStorage
   * @property sessionStorage
   */
  sessionStorage: Ember.computed(function () {
    return Ember.Object.create({
      storage: this.get('global.sessionStorage'),
      setItem(key, value) {
        this.get('storage').setItem(key, value);
      },
      getItem(key) {
        return this.get('storage').getItem(key);
      },
      removeItem(key) {
        this.get('storage').removeItem(key);
      },
      clear() {
        this.get('storage').clear();
      },
      length() {
        return this.get('storage.length');
      }
    });
  }),

  /**
   * Used for non-persistent storage. This data will disappear as soon as the app is destroyed.
   * @property object
   */
  objectStorage: Ember.computed(function () {
    return Ember.Object.create({
      storage: Ember.Map.create(),
      setItem(key, value) {
        this.get('storage').set(key, value);
      },
      getItem(key) {
        return this.get('storage').get(key);
      },
      removeItem(key){
        this.get('storage').delete(key);
      },
      clear() {
        this.get('storage').clear();
      },
      length() {
        return this.get('storage.size');
      }
    });
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
