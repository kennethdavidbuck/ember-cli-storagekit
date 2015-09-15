import Ember from 'ember';
import BuildNamespaceMixin from '../../../mixins/build-namespace';
import { module, test } from 'qunit';

module('Unit | Mixin | build namespace');

// Replace this with your real tests.
test('it works', function(assert) {
  var BuildNamespaceObject = Ember.Object.extend(BuildNamespaceMixin);
  var subject = BuildNamespaceObject.create();
  assert.ok(subject);
});
