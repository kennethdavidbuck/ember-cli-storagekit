import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import JsonSerializer from '../../../storagekit/serializers/json';

/*global sinon*/

let sandbox;

moduleFor('storagekit/adapter:instance', 'Unit | Adapter | instance', {
  setup() {
    sandbox = sinon.sandbox;
  },
  teardown() {
    sandbox.restore();
  }
});

test('it exists', function (assert) {
  var adapter = this.subject();
  assert.ok(adapter);
});

test('Returns null for key that does not exist', function (assert) {
  assert.expect(1);

  const storageService = this.subject();

  storageService.key('nonExistentKey').then((nonExistentKey) => {
    assert.strictEqual(nonExistentKey, null);
  });
});

test('Returns key from index based on keys ordered alphabetically.', function (assert) {
  assert.expect(2);

  const adapter = this.subject({
    serializer: {
      serialize(value) {
        return value;
      }
    }
  });

  sinon.stub(adapter.get('container'), 'lookupFactory', () => {
    return {};
  });

  new Ember.RSVP.all([adapter.setItem('foo', 'bar'), adapter.setItem('bar', 'qux')]).then(() => {
    adapter.key(0).then((key) => {
      assert.strictEqual(key, 'bar', 'Index zero should be first alphabetical key');
    });

    adapter.key(1).then((key) => {
      assert.strictEqual(key, 'foo', 'Index one should be second alphabetical key');
    });
  });
});

test('Properly reorganizes key indices when key is deleted', function (assert) {
  assert.expect(1);

  const adapter = this.subject({
    serializer: {
      serialize(value) {
        return value;
      }
    }
  });

  sinon.stub(adapter.get('container'), 'lookupFactory', () => {
    return {};
  });

  new Ember.RSVP.all([adapter.setItem('foo', 'bar'), adapter.setItem('bar', 'qux')]).then(() => {
    adapter.removeItem('bar').then(() => {
      adapter.key(0).then((key) => {
        assert.strictEqual(key, 'foo', 'deleting first value shifts other values towards index 0');
      });
    });
  });
});

test('Treats keys that are objects uniformly', function (assert) {
  assert.expect(2);

  const adapter = this.subject({
    serializer: JsonSerializer.create()
  });

  sinon.stub(adapter.get('container'), 'lookupFactory', () => {
    return {};
  });

  adapter.setItem({}, 'foo').then(() => {
    adapter.getItem({}).then((item) => {
      assert.strictEqual(item, 'foo');
    });
    adapter.getItem({foo: 'bar'}).then((item) => {
      assert.strictEqual(item, 'foo', 'a different object be interpreted as the same key');
    });
  });
});

test('Treats keys that are arrays as a string of values', function (assert) {
  assert.expect(2);

  const adapter = this.subject({
    serializer: JsonSerializer.create()
  });

  sinon.stub(adapter.get('container'), 'lookupFactory', () => {
    return {};
  });

  adapter.setItem([1, 2, 3], 'foo').then(() => {
    adapter.getItem([1, 2, 3]).then((item) => {
      assert.strictEqual(item, 'foo');
    });
    adapter.getItem(['a', 'b', 'c']).then((item) => {
      assert.notEqual(item, 'foo', 'a different object be interpreted as the same key');
    });
  });
});

test('undefined is a valid key', function (assert) {
  assert.expect(2);

  const adapter = this.subject({
    serializer: JsonSerializer.create()
  });

  sinon.stub(adapter.get('container'), 'lookupFactory', () => {
    return {};
  });

  adapter.setItem(undefined, 'bar').then(() => {
    adapter.getItem(undefined).then((item) => {
      assert.strictEqual(item, 'bar');
    });
    adapter.getItem('undefined').then((item) => {
      assert.strictEqual(item, 'bar');
    });
  });
});

test('null is a valid key', function (assert) {
  assert.expect(2);

  const adapter = this.subject({
    serializer: JsonSerializer.create()
  });

  sinon.stub(adapter.get('container'), 'lookupFactory', () => {
    return {};
  });

  adapter.setItem(null, 'bar').then(() => {
    adapter.getItem(null).then((item) => {
      assert.strictEqual(item, 'bar');
    });
    adapter.getItem('null').then((item) => {
      assert.strictEqual(item, 'bar');
    });
  });
});

test('keys returns all keys in storage', function (assert) {
  assert.expect(2);

  const adapter = this.subject({
    serializer: JsonSerializer.create()
  });

  sinon.stub(adapter.get('container'), 'lookupFactory', () => {
    return {};
  });

  adapter.setItem('foo', 'bar').then(() => {
    adapter.keys().then((keys) => {
      assert.equal(keys.length, 1);
      assert.equal(keys[0], 'foo');
    });
  });
});

test('keys returns all keys in alphabetical order', function (assert) {
  assert.expect(3);

  const adapter = this.subject({
    serializer: JsonSerializer.create()
  });

  sinon.stub(adapter.get('container'), 'lookupFactory', () => {
    return {};
  });

  new Ember.RSVP.all([adapter.setItem('foo', 'bar'), adapter.setItem('baz', 'qux')]).then(() => {
    adapter.keys().then((keys) => {
      assert.equal(keys.length, 2);
      assert.equal(keys[0], 'baz');
      assert.equal(keys[1], 'foo');
    });
  });
});
