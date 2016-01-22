import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Handle event triggered by gru-switch
     */
    optionSwitch:function() {
      var showPerformance = this.get('showPerformance');
      this.set('showPerformance', !showPerformance);
    }
  },
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
   * Indicate if the table show the performance columns
   *
   * @constant {Boolean}
   */
  showPerformance: true,
  /**
   * List of layouts to be displayed by the switch component
   *
   * @constant {Array}
   */
  switchOptions: Ember.computed(function(){
    var component =this;
    return Ember.A([Ember.Object.create({
      label: component.get('i18n').t('common.show-correct-answer'),
      value: "some-value"
    }),Ember.Object.create({
      label: component.get('i18n').t('common.performance'),
      value: "some-value"
    })]);
  })
});
