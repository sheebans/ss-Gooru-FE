import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * @property {string} on success action to be sent to the parent component
   */
  onSuccessAction: null,

  actions: {
    signUp: function () {
      var self = this;
      this.get('model').save().then(
        function() {
          //self.transitionTo('index');
          if (self.get("onSuccessAction")){
            self.sendAction('onSuccessAction');
          }
        });
      }
      //if (self.get("onSignUpAction")){
      //  self.sendAction('onSignUpAction');
     // }
  }

});
