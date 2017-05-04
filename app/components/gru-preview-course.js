import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/course
   */
  courseService: Ember.inject.service('api-sdk/course'),


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-preview-course'],

  // -------------------------------------------------------------------------
  // Events

  init() {
    var component = this;
    component._super(...arguments);
    component.set('course',component.get('model.content'));
    component.get('courseService').fetchById(component.get('model.content.id')).then(function (course) {
      component.set('course.children',course.children);
    });
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Course} course
   */
  course: null,
  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('course.taxonomy.[]', function() {
    return TaxonomyTag.getTaxonomyTags(this.get('course.taxonomy'));
  })

});
