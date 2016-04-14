import Ember from 'ember';
import ContentEditMixin from 'gooru-web/mixins/content/edit';

export default Ember.Controller.extend(ContentEditMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Actions
  actions:{

    /**
     * Send request to publish a question
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
   * Request pending approval
   * // TODO: Change this to a computed property of a question property
   * @property {Boolean}
   */
  isRequestApproved: false,

  /**
   * Request to make the question searchable been sent?
   * // TODO: Change this to a computed property of a question property
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
