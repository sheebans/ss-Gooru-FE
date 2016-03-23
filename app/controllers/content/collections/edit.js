import Ember from 'ember';
import BuilderMixin from 'gooru-web/mixins/content/builder';

export default Ember.Controller.extend(BuilderMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Actions
  actions:{
    /**
     * Send request to publish a collection
     */
    sendRequest: function () {
      this.set('wasRequestSent',true);
    }
  },
  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Request pending approval
   * @property {Boolean}
   */
  isRequestApproved: false,

  /**
   * Request to make the collection searchable been sent?
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
  })]),
});
