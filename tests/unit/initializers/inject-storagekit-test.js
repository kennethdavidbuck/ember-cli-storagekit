import Ember from 'ember';
import InjectStoragekitInitializer from 'dummy/initializers/inject-storagekit';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | inject storagekit', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  InjectStoragekitInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
