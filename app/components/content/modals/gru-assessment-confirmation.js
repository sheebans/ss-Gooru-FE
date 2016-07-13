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

  init() {
    this._super(...arguments);
    this.set('unlimited', this.get('model.setting.attempts_allowed')==-1 ? true : false);

  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

});
