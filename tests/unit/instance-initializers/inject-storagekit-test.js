import { module, test } from 'qunit';

import Ember from 'ember';
import InjectStoragekitInstanceInitializer from 'dummy/instance-initializers/inject-storagekit';
import InstanceStorageAdapter from 'ember-cli-storagekit/adapters/instance';
import StorageSupportUtility from 'ember-cli-storagekit/utilities/storage-support';

import destroyApp from '../../helpers/destroy-app';

/*global sinon*/

let sandbox = sinon.sandbox;

module('Unit | Instance Initializer | inject storagekit', {
  beforeEach() {
    Ember.run(() => {
      this.application = Ember.Application.create();
      this.appInstance = this.application.buildInstance();
    });
  },
  afterEach() {
    Ember.run(this.appInstance, 'destroy');
    destroyApp(this.application);

    sandbox.restore();
  }
});

test('Registers local/session adapters are not present', function(assert) {
  assert.expect(2);

  sandbox.stub(StorageSupportUtility, 'has').returns(false);

  InjectStoragekitInstanceInitializer.initialize(this.appInstance);

  const RegisteredLocalStorageService = this.appInstance.resolveRegistration('storagekit/adapter:local');

  assert.strictEqual(RegisteredLocalStorageService, InstanceStorageAdapter);

  const RegisteredSessionStorageService = this.appInstance.resolveRegistration('storagekit/adapter:session');

  assert.strictEqual(RegisteredSessionStorageService, InstanceStorageAdapter);
});

