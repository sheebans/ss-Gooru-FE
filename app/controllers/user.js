import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  // Actions

  actions:{
    switchTab: function () {
      $('.nav-tabs li.tab:not(.active)').tab('show');
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  "totalJoinedClasses": null,
  "totalTeachingClasses": null,
});
