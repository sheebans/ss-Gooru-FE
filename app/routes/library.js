import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';

/**
 * Library route
 *
 * @module
 * @augments Ember.Route
 */

export default Ember.Route.extend(PrivateRouteMixin, {
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type {searchService} Search service object
   */
  searchService: Ember.inject.service('api-sdk/search'),

  // -------------------------------------------------------------------------
  // Methods

  model: function() {
    let route = this;
    return route.get('searchService').searchFeaturedCourses('*').then(function (result) {
      return Ember.RSVP.hash({
        courses: result
      });
    });
  },
  setupController: function (controller, model) {
    controller.set('courses', model.courses);
  }
});
