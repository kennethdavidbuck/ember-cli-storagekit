import { moduleFor, test } from 'ember-qunit';

/*global sinon*/

let sandbox;

moduleFor('service:storage', 'Unit | Service | Storage', {
  setup() {
    sandbox = sinon.sandbox;
  },
  teardown() {
    sandbox.restore();
  }
});

// Replace this with your real tests.
test('it exists', function (assert) {
  var service = this.subject();
  assert.ok(service);
});

test('objectStorage properly sets and gets with . delimited key', function (assert) {
  assert.expect(1);

  const storageService = this.subject();
  const key = 'foo.bar';
  const value = 'hello world';

  storageService.setItem(key, value, {driver: 'object'});

  assert.equal(storageService.getItem(key, {driver: 'object'}), value, 'returned item should match input item.');
});

test('objectStorage properly sets and gets string value', function (assert) {
  assert.expect(1);

  const storageService = this.subject();
  const key = 'foo';
  const value = 'hello world';

  storageService.setItem(key, value, {driver: 'object'});

  assert.equal(storageService.getItem(key, {driver: 'object'}), value, 'returned item should match input item.');
});

test('objectStorage properly sets and gets object value', function (assert) {
  assert.expect(1);

  const storageService = this.subject();
  const key = 'foo';
  const value = {hello: 'world'};

  storageService.setItem(key, value, {driver: 'object'});

  assert.equal(storageService.getItem(key, {driver: 'object'}).hello, value.hello);
});

test('objectStorage properly removes an item', function (assert) {
  assert.expect(1);

  const storageService = this.subject();
  const key = 'foo';
  const value = 'hello world';

  storageService.setItem(key, value, {driver: 'object'});

  storageService.removeItem(key, {driver: 'object'});

  assert.equal(storageService.getItem(key, {driver: 'object'}), undefined);
});

test('objectStorage properly clears', function (assert) {
  assert.expect(2);

  const storageService = this.subject();
  const key1 = 'key1';
  const value1 = 'value1';
  const key2 = 'key2';
  const value2 = 'value2';

  storageService.setItem(key1, value1, {driver: 'object'});
  storageService.setItem(key2, value2, {driver: 'object'});

  storageService.clear({driver: 'object'});

  assert.equal(storageService.getItem(key1, {driver: 'object'}), undefined);
  assert.equal(storageService.getItem(key2, {driver: 'object'}), undefined);
});

test('objectStorage length', function (assert) {
  assert.expect(1);

  const storageService = this.subject();

  assert.equal(storageService.length({driver: 'object'}), 0);
});

//test('Correctly determines that there is no storage support', function (assert) {
//  assert.expect(1);
//
//  const storageService = this.subject({
//    global: {}
//  });
//
//  assert.notOk(storageService.get('hasStorageSupport'), 'Should determine that there is no storage support.');
//});

//test('Correctly determines that there is storage support', function (assert) {
//  assert.expect(1);
//
//  const storageService = this.subject({
//    global: {
//      localStorage: {},
//      sessionStorage: {}
//    }
//  });
//
//  assert.ok(storageService.get('hasStorageSupport'), 'Should determine that there is storage support.');
//});
//
//test('Recovers from error thrown during storage support check and interprets as lack of support', function (assert) {
//  assert.expect(1);
//
//  const _global = {};
//
//  // package does not support IE8 so we are ok to do this.
//  Object.defineProperty(_global, 'localStorage', {
//    get: function () {
//      throw Error;
//    }
//  });
//
//  const storageService = this.subject({
//    global: _global
//  });
//
//  assert.notOk(storageService.get('hasStorageSupport'), 'Should determine that there is no storage support.');
//});


