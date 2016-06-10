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

  storageService.setItem(key, value).then(() => {
    storageService.getItem(key).then((item) => {
      assert.equal(item, value, 'returned item should match input item.');
    });
  });
});

test('properly sets and gets string value', function (assert) {
  assert.expect(1);

  const storageService = container.lookup('storagekit/service:instance-storage');
  const key = 'foo';
  const value = 'hello world';

  storageService.setItem(key, value).then(() => {
    storageService.getItem(key).then((item) => {
      assert.equal(item, value, 'returned item should match input item.');
    });
  });
});

test('properly sets and gets object value', function (assert) {
  assert.expect(1);

  const storageService = container.lookup('storagekit/service:instance-storage');
  const key = 'foo';
  const value = {hello: 'world'};

  storageService.setItem(key, value).then(() => {
    storageService.getItem(key).then((item) => {
      assert.equal(item.hello, value.hello);
    });
  });
});

test('properly removes an item', function (assert) {
  assert.expect(1);

  const storageService = container.lookup('storagekit/service:instance-storage');
  const key = 'foo';
  const value = 'hello world';

  storageService.setItem(key, value).then(() => {
    storageService.removeItem(key).then(() => {
      storageService.getItem(key).then((item) => {
        assert.equal(item, undefined);
      });
    });
  });
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

  new Ember.RSVP.all([storageService.setItem(key1, value1), storageService.setItem(key2, value2)]).then(() => {
    storageService.clear().then(() => {
      storageService.getItem(key1).then((item) => {
        assert.equal(item, undefined, `${key1} should be cleared`);
      });

      storageService.getItem(key2).then((item) => {
        assert.equal(item, undefined, `${key2} should be cleared`);
      });
    });
  });
});

test('length', function (assert) {
  assert.expect(1);

  const storageService = container.lookup('storagekit/service:instance-storage');

  storageService.length().then((length) => {
    assert.equal(length, 0);
  });
});

test('key returns correct index', function (assert) {
  assert.expect(1);

  const storageService = container.lookup('storagekit/service:instance-storage');

  storageService.setItem('foo', 'bar');
  storageService.setItem('baz', 'qux');

  storageService.keys().then((keys) => {
    assert.deepEqual(keys, ['baz', 'foo']);
  });
});

test('#keys returns correct key set', function (assert) {
  assert.expect(1);

  const storageService = container.lookup('storagekit/service:instance-storage');

  storageService.setItem('foo', 'bar');
  storageService.setItem('baz', 'qux');

  storageService.keys().then((keys) => {
    assert.deepEqual(keys, ['baz', 'foo']);
  });
});
