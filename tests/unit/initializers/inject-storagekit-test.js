import Ember from 'ember';
import InjectStoragekitInitializer from 'dummy/initializers/inject-storagekit';
import InstanceStorageService from 'ember-cli-storagekit/services/instance-storage';
import LocalStorageService from 'ember-cli-storagekit/services/local-storage';
import SessionStorageService from 'ember-cli-storagekit/services/session-storage';
import StorageSupportUtility from 'ember-cli-storagekit/utilities/storage-support';
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

test('Registers local/session storage are present', function(assert) {
  assert.expect(3);

  sandbox.stub(StorageSupportUtility, 'has').returns(true);

  InjectStoragekitInitializer.initialize(application);

  const RegisteredInstanceStorageService = application.resolveRegistration('storagekit/service:instance-storage');

  assert.strictEqual(RegisteredInstanceStorageService, InstanceStorageService);

  const RegisteredLocalStorageService = application.resolveRegistration('storagekit/service:local-storage');

  assert.strictEqual(RegisteredLocalStorageService, LocalStorageService);

  const RegisteredSessionStorageService = application.resolveRegistration('storagekit/service:session-storage');

  assert.strictEqual(RegisteredSessionStorageService, SessionStorageService);
});

test('Registers local/session storage are not present', function(assert) {
  assert.expect(3);

  sandbox.stub(StorageSupportUtility, 'has').returns(false);

  InjectStoragekitInitializer.initialize(application);

  const RegisteredInstanceStorageService = application.resolveRegistration('storagekit/service:instance-storage');

  assert.strictEqual(RegisteredInstanceStorageService, InstanceStorageService);

  const RegisteredLocalStorageService = application.resolveRegistration('storagekit/service:local-storage');

  assert.strictEqual(RegisteredLocalStorageService, InstanceStorageService);

  const RegisteredSessionStorageService = application.resolveRegistration('storagekit/service:session-storage');

  assert.strictEqual(RegisteredSessionStorageService, InstanceStorageService);
});
