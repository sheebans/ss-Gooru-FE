import Ember from 'ember';
import ContentEditMixin from 'gooru-web/mixins/content/edit';

export default Ember.Controller.extend(ContentEditMixin, {

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Edit Content
     */
    editContent: function () {
      var courseForEditing = this.get('course').copy();
      this.set('tempCourse', courseForEditing);
      this.set('isEditing', true);
    },

    /**
     * Save Content
     */
    saveContent: function () {
      // TODO: API call to save content
      this.set('isEditing',false);
    },

    /**
     * Send request to publish a course
     */
    sendRequest: function () {
      this.set('wasRequestSent', true);
    }

  },


  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties

  /**
   * Course model as instantiated by the route. This is the model used when not editing
   * or after any course changes have been saved.
   * @property {Course}
   */
  course: null,

  /**
   * Copy of the course model used for editing.
   * @property {Course}
   */
  tempCourse: null,

  /**
   * Request pending approval
   * // TODO: Change this to a computed property of a course property
   * @property {Boolean}
   */
  isRequestApproved: false,

  /**
   * Request to make the course searchable been sent?
   * // TODO: Change this to a computed property of a course property
   * @property {Boolean}
   */
  wasRequestSent: false,

  /**
   * Toggle Options
   * @property {Ember.Array}
   */
  switchOptions:Ember.A([Ember.Object.create({
    'label': "On",
    'value': true
  }),Ember.Object.create({
    'label': "Off",
    'value': false
  })])

});
