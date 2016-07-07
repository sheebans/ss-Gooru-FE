import Ember from 'ember';
import { ASSESSMENT_SHOW_VALUES } from "gooru-web/config/config";

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'gru-settings-edit'],

  tagName: 'section',

  actions: {
    onSwitchChange: function() {
      this.sendAction('action');
    }
  },

  /**
   * Options for feedback
   * @property {Map}
   */
  feedbackItems: ASSESSMENT_SHOW_VALUES,
  /**
   * Request pending approval
   * @property {Boolean}
   */
  isRequestApproved: false,

  /**
   * Model to change settings to
   * @property {Object}
   */
  model: null,

  /**
   * Has the request to make the item searchable been sent?
   * @property {Boolean}
   */
  wasRequestSent: false,

  /**
   * Toggle Backwards Options
   * @property {Ember.Array}
   */
  backwardsOptions: Ember.A([Ember.Object.create({
    'label': "On",
    'value': true
  }),Ember.Object.create({
    'label': "Off",
    'value': false
  })]),

  /**
   * Toggle Published Options
   * @property {Ember.Array}
   */
  publishedOptions: Ember.A([Ember.Object.create({
    'label': "On",
    'value': true
  }),Ember.Object.create({
    'label': "Off",
    'value': false
  })])
});
