import Ember from 'ember';
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

test('your test here', function(assert) {
  assert.expect(0);
});

