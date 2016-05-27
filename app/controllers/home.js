import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    showClasses: function (type) {
      this.set("showActiveClasses", type === "active");
      this.set("showArchivedClasses", type === "archived");
    },

    downloadReport: function (aClass) {
      Ember.Logger.debug(aClass.get("id"));
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Indicates when then active classes are visible
   * @property {boolean}
   */
  showActiveClasses: true,

  /**
   * Indicates when then archived classes are visible
   * @property {boolean}
   */
  showArchivedClasses: false,


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
