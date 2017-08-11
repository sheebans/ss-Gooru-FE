import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['grading', 'gru-student-roster'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Select student
     */
    selectStudent: function(student) {
      student.set('checked', true);
      this.set('selectedStudent', student);
    },
    /**
     * Close student roster
     */
    close: function() {
      this.sendAction('onClose');
    }
  },

  // -------------------------------------------------------------------------
  // Events

  init: function() {
    this._super(...arguments);
    if (this.get('students').length) {
      this.set(
        'students',
        this.get('students').map(student =>
          Ember.Object.create({ name: student.get('fullName'), checked: false })
        )
      );
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {EmberObject} Selected Student
   */
  selectedStudent: null,
  /**
   * @property {[]} List of student
   */
  students: null
});
