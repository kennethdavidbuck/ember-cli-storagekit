## ember-cli-storagekit [![Build Status](https://travis-ci.org/kennethdavidbuck/ember-cli-storagekit.svg?branch=develop)](https://travis-ci.org/kennethdavidbuck/ember-cli-storagekit)

A thin layer on top of the HTML5 localStorage and sessionStorage services. It also has a third type of storage called 
instanceStorage which can be used for storage on an instance by instance basis. However, the main usecase for instanceStorage is as a 
failover when localStorage and sessionStorage are not available (such as when a user intentionally disables it).

## Installation

Currently you have to use npm and a release tag to install this package.

```
npm install https://github.com/kennethdavidbuck/ember-cli-storagekit.git#v0.1.1
```

## Basic Usage
Storagekit takes care of ```JSON.stringify``` and ```JSON.parse()``` for you, and supports the following methods:

* setItem
* getItem
* removeItem
* clear
* length

Storagekit makes no assumptions about where you would like to make the service available. As such you need to 
create you must specify your own injections.

### initializer
```javascript
export function initialize(registry, application) {
  // inject the storage service, which contains each storage type.
  application.inject('route', 'storageService', 'storagekit/service:storage');
  
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
      // with the storage service
      this.get('storageService.local').setItem('preferences', preferences);
      
      // with localStorage
      this.get('localStorage').setItem('preferences', preferences);
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
      // with storageService
      this.get('storageService.session').setItem('session', session);
    
      // with sessionStorage
      this.get('sessionStorage').setItem('preferences', preferences);
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
      // with storageService
      this.get('storageService.instance').setItem('tempData', temporaryData);
    
      // with instanceStorage
      this.get('instanceStorage').setItem('tempData', temporaryData);
    }
  }
// ...snip...
```

## Generating the Docs
TODO

## Running Tests

* `ember test`
* `ember test --server`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
