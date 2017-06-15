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
    return Ember.RSVP.hash({
      courses: this.get('searchService').searchFeaturedCourses('*')
    });
  },
  setupController: function (controller, model) {
    controller.set('courses', model.courses);
  }
});
