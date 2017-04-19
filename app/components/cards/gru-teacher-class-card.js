import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['gru-teacher-class-card col-xs-12 col-md-6'],

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Class} class information
   */
  class: null,

  /**
   * @property {Object} Object containing student count by class
   */
  classStudentCount: null,

  /**
   * @property {Number} Count of students in the class
   */
  studentCount: Ember.computed('class.id', 'classStudentCount', function() {
    let classStudentCount = this.get('classStudentCount');
    return (classStudentCount && Ember.keys(classStudentCount).length) ?
      (classStudentCount[this.get('class.id')] ? classStudentCount[this.get('class.id')] : 0) : 0;
  })
});
