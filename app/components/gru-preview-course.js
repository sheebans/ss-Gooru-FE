import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-preview-course'],

  // -------------------------------------------------------------------------
  // Actions
  actions:{
    /**
     * Action triggered to remix the course
     * @param content
     */
    remixCourse:function(){
      this.get('model').remixCourse();
    }
  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    var component = this;
    component._super(...arguments);
    component.set('course',component.get('model.content'));
    component.set('isTeacher',component.get('model.isTeacher'));
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
  }),

  /**
   * Indicates if the teacher is seeing the course card
   * @property {boolean}
   */
  isTeacher: null

});
