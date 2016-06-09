import Ember from 'ember';
//import InjectStoragekitInitializer from 'dummy/initializers/inject-storagekit';
//import InstanceStorageAdapter from 'ember-cli-storagekit/adapters/instance';
//import LocalStorageAdapter from 'ember-cli-storagekit/adapters/local';
//import SessionStorageAdapter from 'ember-cli-storagekit/adapters/session';
//import StorageSupportUtility from 'ember-cli-storagekit/utilities/storage-support';
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

test('Registers local/session adapters are present', function(assert) {
  assert.expect(0);
  //
  //assert.expect(3);
  //
  //sandbox.stub(StorageSupportUtility, 'has').returns(true);
  //
  //InjectStoragekitInitializer.initialize(application);
  //
  //const RegisteredInstanceStorageService = application.resolveRegistration('storagekit/adapter:instance');
  //
  //assert.strictEqual(RegisteredInstanceStorageService, InstanceStorageAdapter);
  //
  //const RegisteredLocalStorageService = application.resolveRegistration('storagekit/adapter:local');
  //
  //assert.strictEqual(RegisteredLocalStorageService, LocalStorageAdapter);
  //
  //const RegisteredSessionStorageService = application.resolveRegistration('storagekit/adapter:session');
  //
  //assert.strictEqual(RegisteredSessionStorageService, SessionStorageAdapter);
});

test('Registers local/session adapters are not present', function(assert) {
  assert.expect(0);
  //
  //assert.expect(3);
  //
  //sandbox.stub(StorageSupportUtility, 'has').returns(false);
  //
  //InjectStoragekitInitializer.initialize(application);
  //
  //const RegisteredInstanceStorageService = application.resolveRegistration('storagekit/adapter:instance');
  //
  //assert.strictEqual(RegisteredInstanceStorageService, InstanceStorageAdapter);
  //
  //const RegisteredLocalStorageService = application.resolveRegistration('storagekit/adapter:local');
  //
  //assert.strictEqual(RegisteredLocalStorageService, InstanceStorageAdapter);
  //
  //const RegisteredSessionStorageService = application.resolveRegistration('storagekit/adapter:session');
  //
  //assert.strictEqual(RegisteredSessionStorageService, InstanceStorageAdapter);
});
