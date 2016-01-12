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
  didInsertElement:function(){
    console.log(this.get('lesson.collections'),'El log de Jeff');
    this.set('collections',this.get('lesson.collections'));
    console.log(this.get('collections.firstObject.title'));
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
  userId:'',

  collections:null

  // -------------------------------------------------------------------------

  // Methods
});
