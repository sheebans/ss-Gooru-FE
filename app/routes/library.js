import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';
import LibraryModel from 'gooru-web/models/library/library';

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
   * @type {searchService} Search service object
   */
  libraryService: Ember.inject.service('api-sdk/library'),

  // -------------------------------------------------------------------------
  // Methods

  model: function() {

    const library = LibraryModel.create({ //for testing, delete it later
      id: 1,
      name: "Ale library",
      thumbnail: "ba956a97-ae15-11e5-a302-f8a963065976.png",
      tenant: "ba956a97-ae15-11e5-a302-f8a963065976",
      tenant_root: null,
      course_count: 5,
      assessment_count: 12,
      collection_count: 15,
      resource_count: 56,
      question_count: 45,
      rubric_count: 12,
      sequence_id: 1,
      taxonomy: null
    });

    return Ember.RSVP.hash({
      courses: this.get('searchService').searchFeaturedCourses('*'),
      libraries: this.get('libraryService').fetchLibraries(),
      library
    });
  },
  setupController: function (controller, model) {
    controller.set('courses', model.courses);
    controller.set('libraries', model.libraries);
    controller.set('library', model.library);
  }
});
