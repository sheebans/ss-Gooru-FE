import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'gru-settings-edit'],

  tagName: 'section',

  actions: {
    switchPublishToProfile: function(isChecked) {
      this.sendAction('action', isChecked);
    }
  },

  /**
   * Indicates if the switch in settings must be checked
   * @property {Boolean}
   */
  isChecked: false,

  /**
   * Request pending approval
   * @property {Boolean}
   */
  isRequestApproved: false,

  /**
   * Has the request to make the item searchable been sent?
   * @property {Boolean}
   */
  wasRequestSent: false,

  /**
   * Toggle Options
   * @property {Ember.Array}
   */
  switchOptions: Ember.A([Ember.Object.create({
    'label': "On",
    'value': true
  }),Ember.Object.create({
    'label': "Off",
    'value': false
  })])
});
