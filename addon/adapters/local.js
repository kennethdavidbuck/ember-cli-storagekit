import BuildNamespaceMixin from '../mixins/build-namespace';
import Ember from 'ember';
import JsonSerializer from '../serializers/json';

/*global window*/

export default Ember.Object.extend(BuildNamespaceMixin, {

  storage: window.localStorage,

  serializer: JsonSerializer.create(),

  setItem(key, value) {
    this.get('storage').set(this.buildNamespace(key), this.get('serializer').serialize(value));
  },

  getItem(key) {
    return this.get('serializer').deserialize(this.get('storage').get(this.buildNamespace(key)));
  },

  removeItem(key){
    this.get('storage').delete(this.buildNamespace(key));
  },

  clear() {
    this.get('storage').clear();
  },

  length() {
    return this.get('storage.length');
  }
});
