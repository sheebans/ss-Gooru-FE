import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-tour'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {


  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);

  },


  // -------------------------------------------------------------------------
  // Properties

  currentStep :0,
  
  stepKeys: Ember.Object.create({
    'overview': Ember.A({
      'stepOne': Ember.Object.create({
        'title': ''
      })
    })
  })


});
