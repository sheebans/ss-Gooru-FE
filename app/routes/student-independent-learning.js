import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';
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

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Triggered when a class menu item is selected
     * @param {string} item
     */
    selectMenuItem: function(item) {
      const route = this;
      const controller = route.get('controller');
      const currentItem = controller.get('menuItem');

      if (item !== currentItem) {
        controller.selectMenuItem(item);
        if (item == 'current-study') {
          route.transitionTo('student-independent-learning.learning-base');
        } else {
          route.transitionTo('student-independent-learning.student-bookmarks');
        }
      }
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  model: function() {
    let route = this;
    const configuration = this.get('configurationService.configuration');

    let myClasses =
      route.modelFor('application').myClasses || //when refreshing the page the variable is accessible at the route
      route.controllerFor('application').get('myClasses'); //after login the variable is refreshed at the controller
    const myId = route.get('session.userId');
    let firstCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    let secondCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    let thirdCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    let fourthCoursePromise = Ember.RSVP.resolve(Ember.Object.create({}));
    const firstCourseId = configuration.get(
      'exploreFeaturedCourses.firstCourseId'
    );
    const secondCourseId = configuration.get(
      'exploreFeaturedCourses.secondCourseId'
    );
    const thirdCourseId = configuration.get(
      'exploreFeaturedCourses.thirdCourseId'
    );
    const fourthCourseId = configuration.get(
      'exploreFeaturedCourses.fourthCourseId'
    );
    var featuredCourses = Ember.A([]);

    const activeClasses = myClasses.getStudentActiveClasses(myId);

    if (firstCourseId) {
      firstCoursePromise = route.get('courseService').fetchById(firstCourseId);
    }
    if (secondCourseId) {
      secondCoursePromise = route
        .get('courseService')
        .fetchById(secondCourseId);
    }
    if (thirdCourseId) {
      thirdCoursePromise = route.get('courseService').fetchById(thirdCourseId);
    }
    if (fourthCourseId) {
      fourthCoursePromise = route
        .get('courseService')
        .fetchById(fourthCourseId);
    }
    return Ember.RSVP
      .hash({
        firstCourse: firstCoursePromise,
        secondCourse: secondCoursePromise,
        thirdCourse: thirdCoursePromise,
        fourthCourse: fourthCoursePromise
      })
      .then(function(hash) {
        const firstFeaturedCourse = hash.firstCourse;
        const secondFeaturedCourse = hash.secondCourse;
        const thirdFeaturedCourse = hash.thirdCourse;
        const fourthFeaturedCourse = hash.fourthCourse;

        featuredCourses.push(firstFeaturedCourse);
        featuredCourses.push(secondFeaturedCourse);
        featuredCourses.push(thirdFeaturedCourse);
        featuredCourses.push(fourthFeaturedCourse);

        return {
          activeClasses,
          featuredCourses
        };
      });
  },

  setupController: function(controller, model) {
    controller.set('featuredCourses', model.featuredCourses);
    controller.set('toggleState', false);
  }
});
