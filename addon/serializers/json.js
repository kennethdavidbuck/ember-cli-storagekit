import Ember from 'ember';

/*global JSON*/

const {isPresent} = Ember;

export default Ember.Object.extend({

  serialize(value) {
    return JSON.stringify(value);
  },

  deserialize(value) {
    if (isPresent(value)) {
      value = JSON.parse(value);
    }

    return value;
  }
});
