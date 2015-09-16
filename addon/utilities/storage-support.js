import Ember from 'ember';

/*global window*/

export default Ember.Namespace.create({

  global: window,

  has(type) {
    const _global = this.get('global');
    try {
      return type in _global && _global[type] !== null;
    } catch (e) {
      return false;
    }
  }
});
