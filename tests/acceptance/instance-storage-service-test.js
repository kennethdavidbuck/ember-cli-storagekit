import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

let container;

module('Acceptance | instance storage service', {
  beforeEach: function () {
    this.application = startApp();

    container = this.application.__container__;
  },

  afterEach: function () {
    container = null;
    Ember.run(this.application, 'destroy');
  }
});

test('properly sets and gets with . delimited key', function (assert) {
  assert.expect(1);

  const storageService = container.lookup('storagekit/service:instance-storage');
  const key = 'foo.bar';
  const value = 'hello world';

  storageService.setItem(key, value);

  assert.equal(storageService.getItem(key), value, 'returned item should match input item.');
});

test('properly sets and gets string value', function (assert) {
  assert.expect(1);

  const storageService = container.lookup('storagekit/service:instance-storage');
  const key = 'foo';
  const value = 'hello world';

  storageService.setItem(key, value);

  assert.equal(storageService.getItem(key), value, 'returned item should match input item.');
});

test('properly sets and gets object value', function (assert) {
  assert.expect(1);

  const storageService = container.lookup('storagekit/service:instance-storage');
  const key = 'foo';
  const value = {hello: 'world'};

  storageService.setItem(key, value);

  assert.equal(storageService.getItem(key).hello, value.hello);
});

test('properly removes an item', function (assert) {
  assert.expect(1);

  const storageService = container.lookup('storagekit/service:instance-storage');
  const key = 'foo';
  const value = 'hello world';

  storageService.setItem(key, value);

  storageService.removeItem(key);

  assert.equal(storageService.getItem(key), undefined);
});

test('properly clears', function (assert) {
  assert.expect(2);

  const storageService = container.lookup('storagekit/service:instance-storage');
  const key1 = 'key1';
  const value1 = 'value1';
  const key2 = 'key2';
  const value2 = 'value2';

  storageService.setItem(key1, value1);
  storageService.setItem(key2, value2);

  storageService.clear();

  assert.equal(storageService.getItem(key1), undefined, `${key1} should be cleared`);
  assert.equal(storageService.getItem(key2), undefined, `${key2} should be cleared`);
});

test('length', function (assert) {
  assert.expect(1);

  const storageService = container.lookup('storagekit/service:instance-storage');

  assert.equal(storageService.length(), 0);
});

test('key returns correct index', function (assert) {
  assert.expect(2);

  const storageService = container.lookup('storagekit/service:instance-storage');

  storageService.setItem('foo', 'bar');
  storageService.setItem('baz', 'qux');

  assert.equal(storageService.key(0), 'baz');
  assert.equal(storageService.key(1), 'foo');
});

test('#keys returns correct key set', function (assert) {
  assert.expect(1);

  const storageService = container.lookup('storagekit/service:instance-storage');

  storageService.setItem('foo', 'bar');
  storageService.setItem('baz', 'qux');

  assert.deepEqual(storageService.keys(), ['baz', 'foo']);
});

