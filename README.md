## ember-cli-storagekit 
[![npm version](https://badge.fury.io/js/ember-cli-storagekit.svg)](http://badge.fury.io/js/ember-cli-storagekit) [![Build Status](https://travis-ci.org/kennethdavidbuck/ember-cli-storagekit.svg?branch=develop)](https://travis-ci.org/kennethdavidbuck/ember-cli-storagekit) [![Ember Observer Score](http://emberobserver.com/badges/ember-cli-storagekit.svg)](http://emberobserver.com/addons/ember-cli-storagekit) [![Code Climate](https://codeclimate.com/github/kennethdavidbuck/ember-cli-storagekit/badges/gpa.svg)](https://codeclimate.com/github/kennethdavidbuck/ember-cli-storagekit/badges) [![Dependencies](https://david-dm.org/kennethdavidbuck/ember-cli-storagekit.svg)](https://david-dm.org/kennethdavidbuck/ember-cli-storagekit) [![Dev Dependencies](https://david-dm.org/kennethdavidbuck/ember-cli-storagekit/dev-status.svg)](https://david-dm.org/kennethdavidbuck/ember-cli-storagekit#info=devDependencies&view=table) 

A thin layer on top of the HTML5 localStorage and sessionStorage services. It also has a third type of storage called 
instanceStorage which is used as a failover when localStorage or sessionStorage are not available (such as when a user intentionally disables them).

This addon does not assume your application uses ember data. That being said it would serve well as part of a custom local, session, instance storage adapter.

**IMPORTANT**: storagekit has been updated to _always_ return a promise. This has been done in order to make way for other
possible async kv storage services.

## Installation

```
ember install ember-cli-storagekit
```

## Basic Usage
Storagekit takes care of ```JSON.stringify()``` and ```JSON.parse()``` for you, and supports the following async methods:

* setItem
* getItem
* removeItem
* clear
* length
* key

Storagekit makes no assumptions about where you would like to make the service available. As such you need to specify your own injections.

### initializer
```javascript
  export function initialize(registry, application) {
    // inject the storage service, which contains each storage type.
    application.inject('route', 'storage', 'storagekit/service:storage');
    
    // you can also inject each service individually if that is your thing.
    application.inject('route', 'localStorage', 'storagekit/service:local-storage');
    application.inject('route', 'sessionStorage', 'storagekit/service:session-storage');
    application.inject('route', 'instanceStorage', 'storagekit/service:instance-storage');
  }

  export default {
    name: 'inject-storage-service',
    after: 'inject-storagekit',
    initialize: initialize
  };
```

### Local
```javascript
  // A controller...or route
  // ...snip...
  actions: {
    savePreferences(preferences) {
      // with storage
      this.get('storage.local').setItem('preferences', preferences).then(() => {
        // ...
      });
      
      // with localStorage
      this.get('localStorage').setItem('preferences', preferences).then(() => {
        // ...
      });
    }
  }
  // ...snip...
```

### Session
```javascript
  // A controller...or route
  // ...snip...
  actions: {
    saveSession(session) {
      // with storage
      this.get('storage.session').setItem('session', session).then(() => {
        // ...
      });
    
      // with sessionStorage
      this.get('sessionStorage').setItem('session', session).then(() => {
        // ...
      });
    }
  }
  // ...snip...
```

### Instance
```javascript
  // A controller...or route
  // ...snip...
  actions: {
    storeTemporarily(temporaryData) {
      // with storage
      this.get('storage.instance').setItem('temporaryData', temporaryData).then(() => {
        // ...
      });
    
      // with instanceStorage
      this.get('instanceStorage').setItem('temporaryData', temporaryData).then(() => {
        // ...
      });
    }
  }
  // ...snip...
```

## Namespacing
The storagekit env config provides a means for namespacing your application keys. This is how it works:

```javascript
  // ...snip...
  APP: {
    storagekit: {
      namespace: 'storagekit'
    }
  }
  // ...snip...
```

Now your incoming keys will be stored like this:

```
'storagekit:mykey'
```

**IMPORTANT**: The namespace defines the storage "world" for all operations, and will give a result based solely on keys that are namespaced within it. Such methods include: ```#clear```, ```#keys```, ```#length```, and ```#key```. 

Why is this useful? Because it allows you to change your namespace based on the current environment. For example, you can define a different namespace for your test environment and keep yourself shielded from any setup and teardown methods that modify your browsers local or session storage.

It is possible to call such methods within the global scope (not recommended). To do so pass along an options object with a property called global set to true.

```javascript 
  // ...snip...
  this.get('storage.local').clear({global: true}).then(() => {
    // ...
  });
  // ...snip...
```

If you do not specify a namespace, then your keys will be stored in the same form that they are received. If you 
specify a key directly in one of the adapters it will supercede the namespace in the env config.


## Generating the Docs
This addon has yuidoc annotations, and uses [ember-cli-yuidoc](https://github.com/nicoulaj/idea-markdown) in order to generate and serve them.

## Running Tests

* `ember test`
* `ember test --server`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
