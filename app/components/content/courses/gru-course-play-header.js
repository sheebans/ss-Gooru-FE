import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';

export default Ember.Component.extend(ModalMixin, {
  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service('session'),

  /**
   * @requires service:api-sdk/course
   */
  courseService: Ember.inject.service('api-sdk/course'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-course-play-header'],

  tagName: 'header',


  // -------------------------------------------------------------------------
  // Actions

  actions:  {

  },

  // -------------------------------------------------------------------------
  // Events

  didInsertElement: function () {
    const component = this;
    var course = component.get('course');

    if(course){
      course = component.get('courseService').fetchCourseStructure(course);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Course model as instantiated by the route.
   * @property {Course}
   */
  course: null

  // -------------------------------------------------------------------------
  // Methods

});
