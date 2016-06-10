
export default function() {
  // keep backwards compatibility with previous versions having 2 arguments (container, application)
  let application = arguments[1] || arguments[0];

  //adapter injections
  application.inject('storagekit/service:local-storage', 'adapter', 'storagekit/adapter:local');
  application.inject('storagekit/service:session-storage', 'adapter', 'storagekit/adapter:session');
  application.inject('storagekit/service:instance-storage', 'adapter', 'storagekit/adapter:instance');

  // service injections
  application.inject('storagekit/service:storage', 'local', 'storagekit/service:local-storage');
  application.inject('storagekit/service:storage', 'session', 'storagekit/service:session-storage');
  application.inject('storagekit/service:storage', 'instance', 'storagekit/service:instance-storage');

  // serializer injections
  application.inject('storagekit/adapter', 'serializer', 'storagekit/serializer:json');
}
