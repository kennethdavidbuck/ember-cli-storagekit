import { moduleFor, test } from 'ember-qunit';
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

  assert.strictEqual(storageService.key('nonExistentKey'), null);
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

  adapter.setItem('foo', 'bar');
  adapter.setItem('bar', 'qux');

  assert.strictEqual(adapter.key(0), 'bar', 'Index zero should be first alphabetical key');
  assert.strictEqual(adapter.key(1), 'foo', 'Index one should be second alphabetical key');
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

  adapter.setItem('foo', 'bar');
  adapter.setItem('bar', 'qux');

  adapter.removeItem('bar');

  assert.strictEqual(adapter.key(0), 'foo', 'deleting first value shifts other values towards index 0');
});

test('Treats keys that are objects uniformly', function (assert) {
  assert.expect(2);

  const adapter = this.subject({
    serializer: JsonSerializer.create()
  });

  sinon.stub(adapter.get('container'), 'lookupFactory', () => {
    return {};
  });

  adapter.setItem({}, 'foo');

  assert.strictEqual(adapter.getItem({}), 'foo');
  assert.strictEqual(adapter.getItem({foo: 'bar'}), 'foo', 'a different object be interpreted as the same key');
});

test('Treats keys that are arrays as a string of values', function (assert) {
  assert.expect(2);

  const adapter = this.subject({
    serializer: JsonSerializer.create()
  });

  sinon.stub(adapter.get('container'), 'lookupFactory', () => {
    return {};
  });

  adapter.setItem([1, 2, 3], 'foo');

  assert.strictEqual(adapter.getItem([1, 2, 3]), 'foo');
  assert.notEqual(adapter.getItem(['a', 'b', 'c']), 'foo', 'a different object be interpreted as the same key');
});

test('undefined is a valid key', function (assert) {
  assert.expect(2);

  const adapter = this.subject({
    serializer: JsonSerializer.create()
  });

  sinon.stub(adapter.get('container'), 'lookupFactory', () => {
    return {};
  });

  adapter.setItem(undefined, 'bar');

  assert.strictEqual(adapter.getItem(undefined), 'bar');

  assert.strictEqual(adapter.getItem('undefined'), 'bar');
});

test('null is a valid key', function (assert) {
  assert.expect(2);

  const adapter = this.subject({
    serializer: JsonSerializer.create()
  });

  sinon.stub(adapter.get('container'), 'lookupFactory', () => {
    return {};
  });

  adapter.setItem(null, 'bar');

  assert.strictEqual(adapter.getItem(null), 'bar');

  assert.strictEqual(adapter.getItem('null'), 'bar');
});

test('keys returns all keys in storage', function (assert) {
  assert.expect(2);

  const adapter = this.subject({
    serializer: JsonSerializer.create()
  });

  sinon.stub(adapter.get('container'), 'lookupFactory', () => {
    return {};
  });

  adapter.setItem('foo', 'bar');

  assert.equal(adapter.keys().length, 1);
  assert.equal(adapter.keys()[0], 'foo');
});

test('keys returns all keys in alphabetical order', function (assert) {
  assert.expect(3);

  const adapter = this.subject({
    serializer: JsonSerializer.create()
  });

  sinon.stub(adapter.get('container'), 'lookupFactory', () => {
    return {};
  });

  adapter.setItem('foo', 'bar');
  adapter.setItem('baz', 'qux');

  const keys = adapter.keys();

  assert.equal(keys.length, 2);
  assert.equal(keys[0], 'baz');
  assert.equal(keys[1], 'foo');
});
