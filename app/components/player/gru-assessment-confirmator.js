import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';

export default Ember.Component.extend(ModalMixin,{

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Ember.Service} Service to do retrieve audiences
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['gru-assessment-confirmator'],

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Properties
  direction: null,

  attempts:null,
  didInsertElement() {
    this._super(...arguments);
    var model = {
      direction: this.get('direction'),
      attempts: this.get('attempts'),
      title: this.get('title'),
      onStart: function() {
        return this.sendAction('onStart');
      }.bind(this),
      onCancel: function() {
        return this.sendAction('onCancel');
      }.bind(this),

    };
    this.actions.showModal.call(this,
      'content.modals.gru-assessment-confirmation',
      model);
  }

});
