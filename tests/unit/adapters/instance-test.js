import { moduleFor, test } from 'ember-qunit';
import JsonSerializer from '../../../storagekit/serializers/json';

moduleFor('storagekit/adapter:instance', 'Unit | Adapter | instance', {});

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
    container: {
      lookupFactory() {
        return {};
      }
    },
    serializer: {
      serialize(value) {
        return value;
      }
    }
  });

  adapter.setItem('foo', 'bar');
  adapter.setItem('bar', 'qux');

  assert.strictEqual(adapter.key(0), 'bar', 'Index zero should be first alphabetical key');
  assert.strictEqual(adapter.key(1), 'foo', 'Index one should be second alphabetical key');
});

test('Properly reorganizes key indices when key is deleted', function (assert) {
  assert.expect(1);

  const adapter = this.subject({
    container: {
      lookupFactory() {
        return {};
      }
    },
    serializer: {
      serialize(value) {
        return value;
      }
    }
  });

  adapter.setItem('foo', 'bar');
  adapter.setItem('bar', 'qux');

  adapter.removeItem('bar');

  assert.strictEqual(adapter.key(0), 'foo', 'deleting first value shifts other values towards index 0');
});

test('Treats keys that are objects uniformly', function (assert) {
  assert.expect(2);

  const adapter = this.subject({
    container: {
      lookupFactory() {
        return {};
      }
    },
    serializer: JsonSerializer.create()
  });

  adapter.setItem({}, 'foo');

  assert.strictEqual(adapter.getItem({}), 'foo');
  assert.strictEqual(adapter.getItem({foo: 'bar'}), 'foo', 'a different object be interpreted as the same key');
});

test('Treats keys that are arrays as a string of values', function (assert) {
  assert.expect(2);

  const adapter = this.subject({
    container: {
      lookupFactory() {
        return {};
      }
    },
    serializer: JsonSerializer.create()
  });

  adapter.setItem([1, 2, 3], 'foo');

  assert.strictEqual(adapter.getItem([1, 2, 3]), 'foo');
  assert.notEqual(adapter.getItem(['a', 'b', 'c']), 'foo', 'a different object be interpreted as the same key');
});

test('undefined is a valid key', function (assert) {
  assert.expect(2);

  const adapter = this.subject({
    container: {
      lookupFactory() {
        return {};
      }
    },
    serializer: JsonSerializer.create()
  });

  adapter.setItem(undefined, 'bar');

  assert.strictEqual(adapter.getItem(undefined), 'bar');

  assert.strictEqual(adapter.getItem('undefined'), 'bar');
});

test('null is a valid key', function (assert) {
  assert.expect(2);

  const adapter = this.subject({
    container: {
      lookupFactory() {
        return {};
      }
    },
    serializer: JsonSerializer.create()
  });

  adapter.setItem(null, 'bar');

  assert.strictEqual(adapter.getItem(null), 'bar');

  assert.strictEqual(adapter.getItem('null'), 'bar');
});
