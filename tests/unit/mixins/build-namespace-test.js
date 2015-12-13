import Ember from 'ember';
import BuildNamespaceMixin from '../../../storagekit/mixins/build-namespace';
import { module, test } from 'qunit';

module('Unit | Mixin | Build Namespace');

const BuildNamespaceObject = Ember.Object.extend(BuildNamespaceMixin);

test('Correctly generates namespace key when namespace is the empty string.', function (assert) {
  assert.expect(1);

  const buildNamespaceObject =  BuildNamespaceObject.create();

  assert.strictEqual(buildNamespaceObject.buildNamespace('foo'), 'foo');
});

test('Correctly generates namespace key when valid namespace string is specified.', function (assert) {
  assert.expect(1);

  const buildNamespaceObject =  BuildNamespaceObject.create({
    namespace: 'foo'
  });

  assert.strictEqual(buildNamespaceObject.buildNamespace('bar'), 'foo:bar');
});

test('Correctly generates namespace key from environment config', function (assert) {
  assert.expect(1);

  const buildNamespaceObject =  BuildNamespaceObject.create({
    container: {
      lookupFactory() {
        return {
          APP: {
            storagekit: {
              namespace: 'foo'
            }
          }
        };
      }
    }
  });

  assert.strictEqual(buildNamespaceObject.buildNamespace('bar'), 'foo:bar');
});

test('Setting namespace directly overrides environment config value', function (assert) {
  assert.expect(2);

  const buildNamespaceObject =  BuildNamespaceObject.create({
    container: {
      lookupFactory() {
        return {
          APP: {
            storagekit: {
              namespace: 'foo'
            }
          }
        };
      }
    }
  });

  assert.strictEqual(buildNamespaceObject.buildNamespace('bar'), 'foo:bar');

  buildNamespaceObject.set('namespace', 'qux');

  assert.strictEqual(buildNamespaceObject.buildNamespace('bar'), 'qux:bar');
});

test('Config namespace is not used if namespace property is already present', function (assert) {
  assert.expect(1);

  const buildNamespaceObject =  BuildNamespaceObject.create({
    namespace: 'use-me',
    container: {
      lookupFactory() {
        return {
          APP: {
            storagekit: {
              namespace: 'do-not-use-me'
            }
          }
        };
      }
    }
  });

  assert.strictEqual(buildNamespaceObject.buildNamespace('bar'), 'use-me:bar');
});

test('Correctly generates namespace key when valid namespace is undefined.', function (assert) {
  assert.expect(1);

  const buildNamespaceObject =  BuildNamespaceObject.create({
    namespace: undefined
  });

  assert.strictEqual(buildNamespaceObject.buildNamespace('foo'), 'foo');
});

test('Correctly generates namespace key when valid namespace is null.', function (assert) {
  assert.expect(1);

  const buildNamespaceObject =  BuildNamespaceObject.create({
    namespace: null
  });

  assert.strictEqual(buildNamespaceObject.buildNamespace('foo'), 'foo');
});

test('Correctly generates namespace key when valid namespace is false.', function (assert) {
  assert.expect(1);

  const buildNamespaceObject =  BuildNamespaceObject.create({
    namespace: false
  });

  assert.strictEqual(buildNamespaceObject.buildNamespace('foo'), 'foo');
});

test('determines a key is namespaced when when no namespace specified (global namespace)', function (assert) {
  assert.expect(1);

  const buildNamespaceObject = BuildNamespaceObject.create({
    namespace: false
  });

  assert.ok(buildNamespaceObject.isNamespacedKey('foo'), 'no namespace means all keys are globally namespaced.');
});


test('determines a key is namespaced when namespace specified', function (assert) {
  assert.expect(1);

  const buildNamespaceObject = BuildNamespaceObject.create({
    namespace: 'foo'
  });

  assert.ok(buildNamespaceObject.isNamespacedKey('foo:bar'), 'should determine key is namespaced.');
});

test('determines a key is not namespaced', function (assert) {
  const buildNamespaceObject = BuildNamespaceObject.create({
    namespace: 'foo'
  });

  assert.ok(!buildNamespaceObject.isNamespacedKey('bar'), 'should determine key is not namespaced.');
});

test('extracts key from namespace when namespace provided', function (assert) {
  assert.expect(1);

  const buildNamespaceObject = BuildNamespaceObject.create({
    namespace: 'foo'
  });

  assert.equal(buildNamespaceObject.extractKey('foo:bar'), 'bar');
});

test('extracts key from namespace when no namespace provided', function (assert) {
  assert.expect(1);

  const buildNamespaceObject = BuildNamespaceObject.create({
    namespace: null
  });

  assert.equal(buildNamespaceObject.extractKey('bar'), 'bar');
});

test('throws error when attempting to extract non-namespaced key', function (assert) {
  assert.expect(1);

  const buildNamespaceObject = BuildNamespaceObject.create({
    namespace: 'foo'
  });

  try {
    buildNamespaceObject.extractKey('bar');
  } catch(e) {
    assert.ok(true);
  }
});
