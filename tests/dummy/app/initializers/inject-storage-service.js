export function initialize(registry, application) {
  application.inject('service:session', 'storageService', 'service:storage');
  application.inject('adapter', 'storageService', 'service:storage');
  application.inject('controller', 'storageService', 'service:storage');
  application.inject('model', 'storageService', 'service:storage');
  application.inject('route', 'storageService', 'service:storage');
}

export default {
  name: 'inject-storage-service',
  initialize: initialize
};
