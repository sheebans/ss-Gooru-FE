import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Actions
  
  actions: {
    /**
     * Action triggered when the user close the content player
     */
    closeContentPlayer:function(){
      window.history.back();
    }
  }
});
