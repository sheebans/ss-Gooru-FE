import Ember from 'ember';
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";

/**
 * Home route
 *
 * @module
 * @augments Ember.Route
 */
export default Ember.Route.extend(PrivateRouteMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {ClassService} Service to retrieve user information
   */
  classService: Ember.inject.service("api-sdk/class"),

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  /**
   * @type {SessionService} Service to retrieve session information
   */
  session: Ember.inject.service("session"),

  // -------------------------------------------------------------------------
  // Actions



  // -------------------------------------------------------------------------
  // Methods

  /**
   * Get model for the controller
   */
  model: function() {
    let route = this;
    const myId = route.get("session.userId");
    let profilePromise = route.get('profileService').readUserProfile(myId);
    const classesStatus = this.get("classService").getReportClassesStatusFromStore(myId);

    return profilePromise.then(function(profile){
      let myClasses = route.get('classService').findMyClasses(profile);
      return Ember.RSVP.hash({
        myClasses: myClasses,
        classesStatus: classesStatus,
        profile: profile
      });
    });
  },

  afterModel: function(model){
    const classes = model.myClasses.classes || Ember.A([]);
    const archivedClasses = classes.filterBy("isArchived", true);
    const classesStatus = model.classesStatus;
    const classService = this.get("classService");
    const promises = [];
    archivedClasses.forEach(function(aClass){
      aClass.set("reportStatus", classesStatus[aClass.get("id")]);
      if (aClass.get("isReportInProgress")){ //checking if the report is ready for those classes having the report in progress
        const promise = classService.readClassReportStatus(aClass.get("id"), aClass.get("courseId"))
          .then(function(status){
            aClass.set("reportStatus", status);
            return status;
        });
        promises.push(promise);
      }
    });

    return Ember.RSVP.all(promises);
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */

  setupController: function(controller, model) {
    controller.set('myClasses', model.myClasses);
    controller.set('profile', model.profile);
  }

});
