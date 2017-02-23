import Ember from 'ember';
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";

/**
 * Student home route
 *
 * @module
 * @augments Ember.Route
 */
export default Ember.Route.extend(PrivateRouteMixin, {

  // -------------------------------------------------------------------------
  // Dependencies
  analyticsService: Ember.inject.service("api-sdk/analytics"),

  performanceService: Ember.inject.service("api-sdk/performance"),

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Methods
  model: function () {
    let route = this;
    let myClasses = route.modelFor('application').myClasses || //when refreshing the page the variable is accessible at the route
      route.controllerFor("application").get("myClasses"); //after login the variable is refreshed at the controller
    const myId = route.get("session.userId");
    const activeClasses = myClasses.getStudentActiveClasses(myId);
    const classIds = activeClasses.mapBy("id");

    return Ember.RSVP.hash({
      classPerformanceSummaryItems: route.get("performanceService").findClassPerformanceSummaryByStudentAndClassIds(myId, classIds),
      classesLocation: route.get("analyticsService").getUserCurrentLocationByClassIds(classIds, myId, true)
    }).then(function(hash){
        const classPerformanceSummaryItems = hash.classPerformanceSummaryItems;
        const classesLocation = hash.classesLocation;
        const promises = activeClasses.map(function (aClass) {
          const classId = aClass.get("id");
          aClass.set("currentLocation", classesLocation.findBy("classId", classId));
          aClass.set("performanceSummary", classPerformanceSummaryItems.findBy("classId", classId));
        });
        return Ember.RSVP.all(promises);
      });
  }

});
