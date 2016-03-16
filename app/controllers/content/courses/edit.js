import Ember from 'ember';
import BuilderMixin from 'gooru-web/mixins/content/builder';

export default Ember.Controller.extend(BuilderMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Actions
  actions:{
    sendRequest:function(){
      this.set('wasRequestSent',true);
    }
  },
  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Indicate if a request to be publish is approved
   * @property {Boolean}
   */
  isRequestApproved:false,
  /**
   * Indicate if a request to be searchable and featured has been send
   * @property {Boolean}
   */
  wasRequestSent:false,
  /**
   * The profile presented to the user
   * @property {Profile}
   */
  switchOptions:Ember.A([Ember.Object.create({
    'label': "On",
    'value': true
  }),Ember.Object.create({
    'label': "Off",
    'value': false
  })]),
});
