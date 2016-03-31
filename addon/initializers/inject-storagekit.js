import InstanceStorageService from 'ember-cli-storagekit/services/instance-storage';
import LocalStorageService from 'ember-cli-storagekit/services/local-storage';
import SessionStorageService from 'ember-cli-storagekit/services/session-storage';
import StorageSupportUtility from '../utilities/storage-support';

export default function () {
  // keep backwards compatibility with previous versions having 2 arguments (container, application)
  let application = arguments[1] || arguments[0];

  application.register('storagekit/service:instance-storage', InstanceStorageService);

  const hasLocalStorageSupport = StorageSupportUtility.has('localStorage');
  const LocalStorgeFactory = hasLocalStorageSupport ? LocalStorageService : InstanceStorageService;

  application.register('storagekit/service:local-storage', LocalStorgeFactory);

  const hasSessionStorageSupport = StorageSupportUtility.has('sessionStorage');
  const SessionStorageFactory = hasSessionStorageSupport ? SessionStorageService : InstanceStorageService;

  application.register('storagekit/service:session-storage', SessionStorageFactory);

  application.inject('storagekit/service:storage', 'local', 'storagekit/service:local-storage');
  application.inject('storagekit/service:storage', 'session', 'storagekit/service:session-storage');

  application.inject('storagekit/service:storage', 'instance', 'storagekit/service:instance-storage');

  // adapter injections
  application.inject('storagekit/service:instance-storage', 'adapter', 'storagekit/adapter:instance');
  application.inject('storagekit/service:local-storage', 'adapter', 'storagekit/adapter:local');
  application.inject('storagekit/service:session-storage', 'adapter', 'storagekit/adapter:session');

  // serializer injections
  application.inject('storagekit/adapter', 'serializer', 'storagekit/serializer:json');
}
