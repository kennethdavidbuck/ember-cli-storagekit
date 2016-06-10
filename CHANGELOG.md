# ember-cli-storagekit change log

### 0.4.2
- [#4](https://github.com/kennethdavidbuck/ember-cli-storagekit/pull/4) [BUGFIX] Fixes issue where the kit was not using
the expected instance storage failover. Updates storage support check to happen as an instance initializer. Makes storage
support more robust.

### 0.4.1
- [BUGFIX] Updated storage service injection strategy to register instance-storage as fallback instead of applying strategy
at injection time. Fixes issue where multiple unique instances of instance storage service could be created when 
localStorage/sessionStorage are not available.
- [Improvement] Upped test coverage

### 0.4.0
- [UPGRADE] Upgraded to Ember 2.2.0
- [BUGFIX] Removed namespace keys returned from #keys method
- [IMPROVEMENT] **Breaking Change** Removed options argument for global clearing of storage [only applies to storage world now]
- [IMPROVEMENTt] Removed double pass on keys array in #keys method
- [CLEANUP] Switched to using es6 expressions where applicable

### 0.3.2
- [BUGFIX] Updated initializers to use backwards compatible means of accessing application instance
- [CLEANUP] Switched to using sinon for stubbing adapter container in unit tests.

### 0.3.1
- [BUGFIX] Better storage support check to ios5 browsing mode.

### 0.3.0
- [FEATURE] Storage methods respect namespace for all operations including #clear, #keys, #key, and #length

### 0.2.8
- [REFACTOR] Refactored adapters to use a common abstract adapter

### 0.2.7
- [DOCS] Updated README.md to include code climate, dependecies, devDependencies, and npm package version
- [DEPENDENCY] Updated dependencies/dev-dependencies to current stable releases

### 0.2.6
- [FEATURE] Added #keys method to storage interface.
- [DOCS] Updated README.md to include examples surrounding storage namespace

### 0.2.0

- [CLEANUP] simplified buildNamespace method

- [FEATURE] made storage namespace configurable

- [DOCS] Updated yuidocs

- [DOCS] added ember-cli-yuidoc

- [DOCS] updated README.md documentation.

- [DOCS] fixed travis build status
