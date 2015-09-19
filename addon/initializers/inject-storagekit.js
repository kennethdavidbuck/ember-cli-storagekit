import StorageSupportUtility from '../utilities/storage-support';

export function initialize(container, application) {
  // serializer injections
  application.inject('storagekit/adapter', 'serializer', 'storagekit/serializer:json');

  // adapter injections
  application.inject('storagekit/service:instance-storage', 'adapter', 'storagekit/adapter:instance');
  application.inject('storagekit/service:local-storage', 'adapter', 'storagekit/adapter:local');
  application.inject('storagekit/service:session-storage', 'adapter', 'storagekit/adapter:session');

  // instance storage injection
  application.inject('storagekit/service:storage', 'instance', 'storagekit/service:instance-storage');

  // local storage injection
  let localType = 'storagekit/service:local-storage';
  let localOptions = {singleton:true};

  if(!StorageSupportUtility.has('localStorage')) {
    localType = 'storagekit/service:instance-storage';
    localOptions.singleton = false;
  }

  application.inject('storagekit/service:storage', 'local', localType, localOptions);

  // session storage injection
  let sessionType = 'storagekit/service:session-storage';
  let sessionOptions = {singleton:true};

  if(!StorageSupportUtility.has('sessionStorage')) {
    sessionType = 'storagekit/service:instance-storage';
    sessionOptions.singleton = false;
  }

  application.inject('storagekit/service:storage', 'session', sessionType, sessionOptions);
}

export default {
  name: 'inject-storagekit',
  initialize: initialize
};
