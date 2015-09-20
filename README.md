## ember-cli-storagekit [![Build Status](https://travis-ci.org/kennethdavidbuck/ember-cli-storagekit.svg?branch=develop)](https://travis-ci.org/kennethdavidbuck/ember-cli-storagekit)

A thin layer on top of the HTML5 localStorage and sessionStorage services. It also has a third type of storage called 
instanceStorage which can be used for storage on an instance by instance basis. Additionally instanceStorage is used 
internally as a failover when localStorage and sessionStorage are not available (such as when a user intentionally disables it).

## Installation

Currently you have to use npm and a release tag to install this package.

```
npm install https://github.com/kennethdavidbuck/ember-cli-storagekit.git#v0.1.0
```

## Basic Usage
ember-cli-storagekit makes no assumptions about where you would like to make the service available. As such you need to 
create you must specify your own injections.

### initializer
```javascript
export function initialize(registry, application) {
  // inject the storage service, which contains each storage type.
  application.inject('controller', 'storageService', 'storagekit/service:storage');
  application.inject('route', 'storageService', 'storagekit/service:storage');
  
  // you can also inject each service individually if that is your thing.
  application.inject('controller', 'localStorage', 'storagekit/service:local-storage');
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
// A controller
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
// A controller
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

## Generating the Docs

## Running Tests

* `ember test`
* `ember test --server`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
