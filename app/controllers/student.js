import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  applicationController: Ember.inject.controller('application'),

  // -------------------------------------------------------------------------
  // Actions



  // -------------------------------------------------------------------------
  // Properties

  /**
   * A link to the parent application controller
   * @see controllers/application.js
   * @property {ClassesModel}
   */
  myClasses: Ember.computed.alias('applicationController.myClasses'),

  /**
   * @property {Profile}
   */
  profile: Ember.computed.alias('applicationController.profile'),

  /**
   * @property {Class[]}
   */
  activeClasses: Ember.computed("myClasses.classes", function () {
    const profile = this.get("profile");
    return this.get("myClasses.classes").filter(function(aClass){
      return !aClass.get("isArchived") && !aClass.isTeacher(profile.get("id"));
    });
  }),

  /**
   * @property {Number} Total of joined classes
   */
  totalJoinedClasses: Ember.computed.alias('activeClasses.length'),

  hasClasses:Ember.computed('totalJoinedClasses',function(){
    return this.get('totalJoinedClasses') > 0;
  })

// -------------------------------------------------------------------------
// Methods

});


