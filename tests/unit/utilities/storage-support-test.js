import Ember from 'ember';
import StorageSupportUtility from '../../../storagekit/utilities/storage-support';
import { module, test } from 'qunit';

module('Unit | Utility | Storage Support', {});

// Replace this with your real tests.
test('it exists', function (assert) {
  assert.ok(StorageSupportUtility);
});

test('Correctly determines that there is localStorage support', function (assert) {
  assert.expect(1);

  Ember.run(() => {
    StorageSupportUtility.set('global', {
      localStorage: {}
    });
  });

  assert.ok(StorageSupportUtility.has('localStorage'), 'Should determine that there is no storage support.');
});

test('Correctly determines that there is no localStorage support', function (assert) {
  assert.expect(1);

  Ember.run(() => {
    StorageSupportUtility.set('global', {});
  });

  assert.notOk(StorageSupportUtility.has('localStorage'), 'Should determine that there is storage support.');
});

test('Correctly determines that there is sessionStorage support', function (assert) {
  assert.expect(1);

  Ember.run(() => {
    StorageSupportUtility.set('global', {
      sessionStorage: {}
    });
  });

  assert.ok(StorageSupportUtility.has('sessionStorage'), 'Should determine that there is no storage support.');
});

test('Correctly determines that there is no sessionStorage support', function (assert) {
  assert.expect(1);

  Ember.run(() => {
    StorageSupportUtility.set('global', {});
  });

  assert.notOk(StorageSupportUtility.has('sessionStorage'), 'Should determine that there is storage support.');
});

test('Recovers from error thrown during storage support check and interprets as lack of support', function (assert) {
  assert.expect(1);

  const _global = {};

  // package does not support IE8 so we are ok to do this.
  Object.defineProperty(_global, 'localStorage', {
    get: function () {
      throw Error;
    }
  });

  Ember.run(() => {
    StorageSupportUtility.set('global', _global);
  });

  assert.notOk(StorageSupportUtility.get('localStorage'),
    'Should determine that there is no localStorage support due to error.');
});

