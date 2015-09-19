export function initialize(container, application) {
  // serializer injections
  application.inject('storagekit/adapter', 'serializer', 'storagekit/serializer:json');

  // adapter injections
  application.inject('storagekit/service:instance-storage', 'adapter', 'storagekit/adapter:instance');
  application.inject('storagekit/service:local-storage', 'adapter', 'storagekit/adapter:local');
  application.inject('storagekit/service:session-storage', 'adapter', 'storagekit/adapter:session');

  // service injections
  application.inject('storagekit/service:storage', 'instance', 'storagekit/service:instance-storage');
  application.inject('storagekit/service:storage', 'local', 'storagekit/service:local-storage');
  application.inject('storagekit/service:storage', 'session', 'storagekit/service:session-storage');
}

export default {
  name: 'inject-storagekit',
  initialize: initialize
};
