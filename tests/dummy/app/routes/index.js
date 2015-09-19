import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    didTransition() {
      this._super();
      console.log(this.get('storageService.object.adapter'));
      return true;
    }
  }
});
