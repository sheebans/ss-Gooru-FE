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

  /**
   * @type {libraryService} Library service object
   */
  libraryService: Ember.inject.service('api-sdk/library'),

  // -------------------------------------------------------------------------
  // Methods

  model: function() {
    return Ember.RSVP.hash({
      courses: this.get('searchService').searchFeaturedCourses('*'),
      libraries: this.get('libraryService').fetchLibraries()
    });
  },
  
  setupController: function (controller, model) {
    console.log(model.libraries);
    controller.set('courses', model.courses);
    controller.set('libraries', model.libraries);
  }
});
