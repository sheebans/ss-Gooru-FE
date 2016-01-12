import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:i18n
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'assessment', 'gru-questions'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * List of questions to be displayed by the component
   *
   * @constant {Array}
   */
  results: null,
  /**
   * List of layouts to be displayed by the switch component
   *
   * @constant {Array}
   */
  switchOptions: Ember.computed(function(){
    var component =this;
    return Ember.A([Ember.Object.create({
      label: component.get('i18n').t('common.correct-answer'),
      value: "some-value"
    }),Ember.Object.create({
      label: component.get('i18n').t('common.performance'),
      value: "some-value"
    })]);
  }),

});
