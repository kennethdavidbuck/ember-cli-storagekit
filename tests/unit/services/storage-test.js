import { moduleFor, test } from 'ember-qunit';

/*global sinon*/

let sandbox;

moduleFor('storagekit/service:storage', 'Unit | Service | Storage', {
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

  const storageService = this.subject().get('object');
  const key = 'foo.bar';
  const value = 'hello world';

  storageService.setItem(key, value);

  assert.equal(storageService.getItem(key), value, 'returned item should match input item.');
});

test('objectStorage properly sets and gets string value', function (assert) {
  assert.expect(1);

  const storageService = this.subject().get('object');
  const key = 'foo';
  const value = 'hello world';

  storageService.setItem(key, value);

  assert.equal(storageService.getItem(key), value, 'returned item should match input item.');
});

test('objectStorage properly sets and gets object value', function (assert) {
  assert.expect(1);

  const storageService = this.subject().get('object');
  const key = 'foo';
  const value = {hello: 'world'};

  storageService.setItem(key, value);

  assert.equal(storageService.getItem(key).hello, value.hello);
});

test('objectStorage properly removes an item', function (assert) {
  assert.expect(1);

  const storageService = this.subject().get('object');
  const key = 'foo';
  const value = 'hello world';

  storageService.setItem(key, value);

  storageService.removeItem(key);

  assert.equal(storageService.getItem(key), undefined);
});

test('objectStorage properly clears', function (assert) {
  assert.expect(2);

  const storageService = this.subject().get('object');
  const key1 = 'key1';
  const value1 = 'value1';
  const key2 = 'key2';
  const value2 = 'value2';

  storageService.setItem(key1, value1);
  storageService.setItem(key2, value2);

  storageService.clear();

  assert.equal(storageService.getItem(key1, {driver: 'object'}), undefined);
  assert.equal(storageService.getItem(key2, {driver: 'object'}), undefined);
});

test('objectStorage length', function (assert) {
  assert.expect(1);

  const storageService = this.subject().get('object');

  assert.equal(storageService.length(), 0);
});
