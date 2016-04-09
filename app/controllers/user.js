import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    switchTab: function () {
      $('.nav-tabs li.tab:not(.active)').tab('show');
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Number} Total of joined classes
   */
  totalJoinedClasses: Ember.computed('myClasses', function() {
    return this.get('myClasses.memberList').length;
  }),

  /**
   * @property {Number} Total of teaching classes
   */
  totalTeachingClasses: Ember.computed('myClasses', function() {
    return this.get('myClasses.ownerList').length + this.get('myClasses.collaboratorList').length;
  })
});
