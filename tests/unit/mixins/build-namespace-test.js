import Ember from 'ember';
import BuildNamespaceMixin from '../../../storagekit/mixins/build-namespace';
import { module, test } from 'qunit';

/*global sinon*/

let sandbox = sinon.sandbox;

module('Unit | Mixin | Build Namespace', {
  unit: true,
  beforeEach() {

  },
  afterEach() {
    sandbox.restore();
  }
});

const BuildNamespaceObject = Ember.Object.extend(BuildNamespaceMixin);

test('Correctly generates namespace key when namespace is the empty string.', function (assert) {
  assert.expect(1);

  const buildNamespaceObject = BuildNamespaceObject.create();

  assert.strictEqual(buildNamespaceObject.buildNamespace('foo'), 'foo');
});

test('Correctly generates namespace key when valid namespace string is specified.', function (assert) {
  assert.expect(1);

  const buildNamespaceObject = BuildNamespaceObject.create({
    namespace: 'foo'
  });

  assert.strictEqual(buildNamespaceObject.buildNamespace('bar'), 'foo:bar');
});

test('Correctly generates namespace key from environment config', function (assert) {
  assert.expect(1);

  sandbox.stub(Ember, 'getOwner', () => {
    return {
      lookup() {
        return {
          storagekit: {
            namespace: 'foo'
          }
        };
      }
    };
  });

  const buildNamespaceObject = BuildNamespaceObject.create();

  assert.strictEqual(buildNamespaceObject.buildNamespace('bar'), 'foo:bar');
});

test('Setting namespace directly overrides environment config value', function (assert) {
  assert.expect(2);

  sandbox.stub(Ember, 'getOwner', () => {
    return {
      lookup() {
        return {
          storagekit: {
            namespace: 'foo'
          }
        };
      }
    };
  });

  const buildNamespaceObject = BuildNamespaceObject.create();

  assert.strictEqual(buildNamespaceObject.buildNamespace('bar'), 'foo:bar');

  buildNamespaceObject.set('namespace', 'qux');

  assert.strictEqual(buildNamespaceObject.buildNamespace('bar'), 'qux:bar');
});

test('Config namespace is not used if namespace property is already present', function (assert) {
  assert.expect(1);

  sandbox.stub(Ember, 'getOwner', () => {
    return {
      lookup() {
        return {
          storagekit: {
            namespace: 'do-not-use-me'
          }
        };
      }
    };
  });

  const buildNamespaceObject = BuildNamespaceObject.create({
    namespace: 'use-me'
  });

  assert.strictEqual(buildNamespaceObject.buildNamespace('bar'), 'use-me:bar');
});

test('Correctly generates namespace key when valid namespace is undefined.', function (assert) {
  assert.expect(1);

  const buildNamespaceObject = BuildNamespaceObject.create({
    namespace: undefined
  });

  assert.strictEqual(buildNamespaceObject.buildNamespace('foo'), 'foo');
});

test('Correctly generates namespace key when valid namespace is null.', function (assert) {
  assert.expect(1);

  const buildNamespaceObject = BuildNamespaceObject.create({
    namespace: null
  });

  assert.strictEqual(buildNamespaceObject.buildNamespace('foo'), 'foo');
});

test('Correctly generates namespace key when valid namespace is false.', function (assert) {
  assert.expect(1);

  const buildNamespaceObject = BuildNamespaceObject.create({
    namespace: false
  });

  assert.strictEqual(buildNamespaceObject.buildNamespace('foo'), 'foo');
});

test('determines a key is namespaced when when no namespace specified (global namespace)', function (assert) {
  assert.expect(1);

  const buildNamespaceObject = BuildNamespaceObject.create({
    namespace: false
  });

  assert.ok(buildNamespaceObject.isNamespaced('foo'), 'no namespace means all keys are globally namespaced.');
});


test('determines a key is namespaced when namespace specified', function (assert) {
  assert.expect(1);

  const buildNamespaceObject = BuildNamespaceObject.create({
    namespace: 'foo'
  });

  assert.ok(buildNamespaceObject.isNamespaced('foo:bar'), 'should determine key is namespaced.');
});

test('determines a key is not namespaced', function (assert) {
  const buildNamespaceObject = BuildNamespaceObject.create({
    namespace: 'foo'
  });

  assert.ok(!buildNamespaceObject.isNamespaced('bar'), 'should determine key is not namespaced.');
});

test('extracts key from namespace when namespace provided', function (assert) {
  assert.expect(1);

  const buildNamespaceObject = BuildNamespaceObject.create({
    namespace: 'foo'
  });

  assert.equal(buildNamespaceObject.stripNamespace('foo:bar'), 'bar');
});

test('extracts key from namespace when no namespace provided', function (assert) {
  assert.expect(1);

  const buildNamespaceObject = BuildNamespaceObject.create({
    namespace: null
  });

  assert.equal(buildNamespaceObject.stripNamespace('bar'), 'bar');
});

test('throws error when attempting to extract non-namespaced key', function (assert) {
  assert.expect(1);

  const buildNamespaceObject = BuildNamespaceObject.create({
    namespace: 'foo'
  });

  try {
    buildNamespaceObject.stripNamespace('bar');
  } catch (e) {
    assert.ok(true);
  }
});

test('[deprecated] isNamespacedKey delegates to namespacedKey', function (assert) {
  assert.expect(1);

  const buildNamespaceObject = BuildNamespaceObject.create({
    namespace: 'foo'
  });

  const spy = sandbox.spy(buildNamespaceObject, 'isNamespaced');

  buildNamespaceObject.isNamespacedKey('foo', 'should delegate to isNamespaced');

  assert.ok(spy.calledOnce);
});
