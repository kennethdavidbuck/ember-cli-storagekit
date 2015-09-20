## ember-cli-storagekit ![Build Status](https://travis-ci.org/kennethdavidbuck/ember-cli-storagekit.svg?branch=develop)](https://travis-ci.org/kennethdavidbuck/ember-cli-storagekit)

A thin layer on top of the HTML5 localStorage and sessionStorage services. It also has a third type of storage called 
instanceStorage which can be used for storage on an instance by instance basis. Additionally instanceStorage is used 
internally as a failover when localStorage and sessionStorage are not available (such as when a user intentionally disables it).

## Installation

Currently you have to use npm and a release tag to install this package.

* npm install https://github.com/kennethdavidbuck/ember-cli-storagekit.git#v0.1.0

## Basic Usage
ember-cli-storagekit makes no assumptions about where you would like to make the service available. As such you need to 
create you must specify your own injections. The following an example of what your initializer might look like:

```javascript
// ...snip...
//...snip...
```

## Running Tests

* `ember test`
* `ember test --server`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
