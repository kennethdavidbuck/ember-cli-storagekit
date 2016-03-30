# ember-cli-storagekit change log

### 0.4.0
- [Upgrade] Upgraded to Ember 2.2.0
- [Bugfix] Removed namespace keys returned from #keys method
- [Improvement] Removed options argument for global clearing of storage [only applies to storage world now]
- [Improvement] Removed double pass on keys array in #keys method
- [Cleanup] Switched to using es6 expressions where applicable

### 0.3.2
- [Bugfix] Updated initializers to use backwards compatible means of accessing application instance
- [Cleanup] Switched to using sinon for stubbing adapter container in unit tests.

### 0.3.1
- [Bugfix] Better storage support check to ios5 browsing mode.

### 0.3.0
- [Feature] Storage methods respect namespace for all operations including #clear, #keys, #key, and #length

### 0.2.8
- [Refactor] Refactored adapters to use a common abstract adapter

### 0.2.7
- [Docs] Updated README.md to include code climate, dependecies, devDependencies, and npm package version
- [Dependency] Updated dependencies/dev-dependencies to current stable releases

### 0.2.6
- [Feature] Added #keys method to storage interface.
- [Docs] Updated README.md to include examples surrounding storage namespace

### 0.2.0

- [Cleanup] simplified buildNamespace method

- [Feature] made storage namespace configurable

- [Docs] Updated yuidocs

- [Docs] added ember-cli-yuidoc

- [Docs] updated README.md documentation.

- [Docs] fixed travis build status
