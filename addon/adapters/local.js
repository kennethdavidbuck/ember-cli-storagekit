import BuildNamespaceMixin from '../mixins/build-namespace';
import Ember from 'ember';

/*global window*/

export default Ember.Object.extend(BuildNamespaceMixin, {

  storage: window.localStorage,

  serializer: null,

  setItem(key, value) {
    this.get('storage').setItem(this.buildNamespace(key), this.get('serializer').serialize(value));
  },

  getItem(key) {
    return this.get('serializer').deserialize(this.get('storage').getItem(this.buildNamespace(key)));
  },

  removeItem(key){
    this.get('storage').removeItem(this.buildNamespace(key));
  },

  clear() {
    this.get('storage').clear();
  },

  length() {
    return this.get('storage.length');
  }
});
