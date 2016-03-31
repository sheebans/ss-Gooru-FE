import Ember from 'ember';
import BuilderMixin from 'gooru-web/mixins/content/builder';

export default Ember.Controller.extend(BuilderMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Actions
  actions:{

    /**
     * Edit Content
     */
    editContent: function () {
      var collectionForEditing = this.get('collection').copy();
      this.set('tempCollection', collectionForEditing);
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
   * Collection model as instantiated by the route. This is the model used when not editing
   * or after any collection changes have been saved.
   * @property {Collection}
   */
  collection: null,

  /**
   * Copy of the collection model used for editing.
   * @property {Collection}
   */
  tempCollection: null,

  /**
   * Request pending approval
   * // TODO: Change this to a computed property of a collection property
   * @property {Boolean}
   */
  isRequestApproved: false,

  /**
   * Request to make the collection searchable been sent?
   * // TODO: Change this to a computed property of a collection property
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
