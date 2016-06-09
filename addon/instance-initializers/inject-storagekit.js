import InstanceStorageAdapter from 'ember-cli-storagekit/adapters/instance';
import StorageSupportUtility from '../utilities/storage-support';

export default function(application) {
  // fallback to instance storage when necessary. Need to do the check here in order to be certain
  // that we are in the browser, since its possibles for initializers may fire during the fastboot process..

  if(!StorageSupportUtility.has('localStorage')) {
    application.register('storagekit/adapter:local', InstanceStorageAdapter);
  }

  if(!StorageSupportUtility.has('sessionStorage')) {
    application.register('storagekit/adapter:session', InstanceStorageAdapter);
  }
}
