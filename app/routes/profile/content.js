import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    term: {
      refreshModel: true
    },
    sortRecent:{
      refreshModel: true
    },
    sortAscending:{
      refreshModel: true
    }
  },

  setupController: function(controller) {
    controller.resetProperties();
    controller.get('parentController').selectMenuItem('content');
  },

  // -------------------------------------------------------------------------
  // Events
  resetController(controller) {
    var queryParams = controller.get('queryParams');
    queryParams.forEach(function (param) {
      if(param==="sortRecent"){
        controller.set(param, true);
      }else{
        controller.set(param, null);
      }
    });
  }

});
