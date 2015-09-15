import Ember from 'ember';

/*global window*/

export default Ember.Namespace.create({
  has(type) {
    try {
      return type in window && window[type] !== null;
    } catch (e) {
      return false;
    }
  }
});
