import Ember from 'ember';
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";
import ConfigurationMixin from 'gooru-web/mixins/configuration';

/**
 * Student independent learning route
 *
 * @module
 * @augments Ember.Route
 */
export default Ember.Route.extend(PrivateRouteMixin, ConfigurationMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {BookmarkService} Service to retrieve bookmark information
   */
  bookmarkService: Ember.inject.service('api-sdk/bookmark'),

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Methods
  model: function () {
    let route = this;
    const configuration = this.get('configurationService.configuration');

    let myClasses = route.modelFor('application').myClasses || //when refreshing the page the variable is accessible at the route
      route.controllerFor("application").get("myClasses"); //after login the variable is refreshed at the controller
    const myId = route.get("session.userId");
    let firstCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    let secondCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    const firstCourseId = configuration.get("exploreFeaturedCourses.firstCourseId");
    const secondCourseId = configuration.get("exploreFeaturedCourses.secondCourseId");
    const activeClasses = myClasses.getStudentActiveClasses(myId);
    const bookmarksPromise = route.get('bookmarkService').fetchBookmarks();
    var featuredCourses = Ember.A([]);

    if (firstCourseId) {
      firstCoursePromise = route.get('courseService').fetchById(firstCourseId);
    }
    if (secondCourseId) {
      secondCoursePromise = route.get('courseService').fetchById(secondCourseId);
    }
    return Ember.RSVP.hash({
      firstCourse: firstCoursePromise,
      secondCourse: secondCoursePromise,
      bookmarks: bookmarksPromise
    }).then(function (hash) {
      const firstFeaturedCourse = hash.firstCourse;
      const secondFeaturedCourse = hash.secondCourse;
      const bookmarks = hash.bookmarks;

      featuredCourses.push(firstFeaturedCourse);
      featuredCourses.push(secondFeaturedCourse);

      return {
        activeClasses,
        featuredCourses,
        bookmarks
      };
    });
  },

  setupController: function(controller, model) {
    controller.set('featuredCourses', model.featuredCourses);
    controller.set('bookmarks', model.bookmarks);
  }

});
