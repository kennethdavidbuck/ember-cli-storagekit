import Ember from 'ember';
import InjectStoragekitInitializer from 'dummy/initializers/inject-storagekit';
import { module, test } from 'qunit';

/*global sinon*/

let application;
let sandbox = sinon.sandbox;

module('Unit | Initializer | inject storagekit', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  },
  afterEach() {
    sandbox.restore();
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  assert.expect(1);

  InjectStoragekitInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
