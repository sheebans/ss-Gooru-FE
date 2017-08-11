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
      this.set(
        'currentUser',
        this.get('users').findBy('id', student.get('id'))
      );
      this.sendAction('onChangeUser');
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
    if (this.get('users').length) {
      this.set(
        'students',
        this.get('users').map(student =>
          Ember.Object.create({
            id: student.get('id'),
            name: student.get('fullNameInformal'),
            checked: false
          })
        )
      );
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Student} Current user on review
   */
  currentUser: null,
  /**
   * @property {Boolean} If grading player is showing a full rubric
   * @see controllers/grading-player
   */
  fullRubric: false,
  /**
   * @property {[]} List of student
   */
  students: null,

  // -------------------------------------------------------------------------
  // Observers

  closeStudentRoster: Ember.observer('fullRubric', function() {
    if (this.get('fullRubric')) {
      this.sendAction('onClose');
    }
  })
});
