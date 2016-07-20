import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-assessment-confirmation'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    start(){
      this.get('model').onStart();
      this.triggerAction({ action: 'closeModal'});
    },
    cancel(){
      this.get('model').onCancel();
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {boolean} flag for disabling button
   */
  noAttempts: Ember.computed.lte('model.attempts', 0),

  unlimited: Ember.computed.equal('model.attempts', -1),
  disableStart: Ember.computed('unlimited', 'noAttempts', function(){
    if(this.get('unlimited')){
      return false;
    }else if (this.get('noAttempts')) {
      return true;
    }
  }),
  formattedResults: Ember.computed('model.attempts','noAttempts', function(){
    if(this.get('noAttempts')){
      return 0;
    }else return this.get('model.attempts');
  })
});
