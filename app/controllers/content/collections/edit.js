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
   * Is a request pending approval?
   * @property {Boolean}
   */
  isRequestApproved: false,

  /**
   * Has a request to make the course searchable been sent?
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
