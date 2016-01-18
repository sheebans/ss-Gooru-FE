import Ember from 'ember';
/**
 * Teacher Scale Indicator
 *
 * Component responsible for showing the Performance Scale Indicator in the teacher page.
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes
  /**
   * Array that computes the elements class names to the specified strings in the array.
   *
   * @attribute {Array}
   */
  classNames:['gru-lesson-performance-container'],
  /**
   * Attribute that computes the element to the specified string.
   *
   * @attribute {String}
   */
  tagName:'div',

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     *
     * Change the arrow's direction
     *
     * @function actions:selectUnit
     */
    selectLesson: function () {
      const component = this;
      let element =$('#'+ component.get('elementId')+' .lesson-performance-title span >i.fa') ;
      if(element.hasClass('fa-chevron-down')){
        element.addClass('fa-chevron-up');
        element.removeClass('fa-chevron-down');
      }
      else{
        element.addClass('fa-chevron-down');
        element.removeClass('fa-chevron-up');
      }
    },
    /**
     * @function actions:selectResource
     * @param {string} collectionId - Identifier for a resource (collection/assessment)
     */
    selectResource: function (collectionId) {
      this.get('onSelectResource')(collectionId);
    }
  },

  // -------------------------------------------------------------------------
  // Events
  // -------------------------------------------------------------------------
  // Properties
  /**
   * Selected option to show when on extra small
   *
   * @property {String}
   */
  selectedOption: null,
  /**
   *  Performance models for this lesson, unit, class, course and student
   *
   * @property {performance/performance}
   */
  lesson:null,
  /**
   * Number of the index of this lesson
   *
   * @property {Number}
   */
  localIndex:null,
  /**
   * Number of the index of this lessons data parent.
   *
   * @property {Number}
   */
  index:null,
  /**
   * UserID this user belongs to
   *
   * @property {String}
   */
  userId:''


  // -------------------------------------------------------------------------

  // Methods
});
