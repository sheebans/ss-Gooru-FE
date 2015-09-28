import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    checkOption: function (value) {
      var model = this.controller.get('model');
      model.set('role', value);
    }
  }

});
