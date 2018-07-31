import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['cards', 'suggest-confirmation'],

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    let component = this;
    component.$('[data-toggle=popover]').popover({
      html: true,
      content: function() {
        return component.$('#suggestion-profile-details').html();
      }
    });
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * collection object
   * @type {Object}
   */
  collection: null,

  /**
   * Students list for suggestion
   * @type {Array}
   */
  students: Ember.A([]),

  /**
   * Maintains collection type
   * @type {String}
   */
  contentType: null,

  /**
   * more items number
   * @type {Number}
   */
  moreStudentsNumber: Ember.computed('students', function() {
    return this.get('students').length - this.get('defaultListStudentNumbers');
  }),

  /**
   * default list student count
   * @type {Number}
   */
  defaultListStudentNumbers: 3,

  /**
   * Defalut list students
   * @return {Array}
   */
  defaultStudentList: Ember.computed('students', function() {
    return this.get('students').slice(0, this.get('defaultListStudentNumbers'));
  }),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Trigger when cancel suggest  popup
     */
    onCancelSuggest() {
      this.sendAction('onCancelSuggest');
    },

    /**
     * Trigger when confirm suggest co popup
     */
    onConfirmSuggest() {
      this.sendAction('onConfirmSuggest');
    }
  }
});
