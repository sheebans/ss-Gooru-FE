import Ember from 'ember';

export default Ember.Component.extend({

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
  questions:null,
  /**
   * List of layouts to be displayed by the switch component
   *
   * @constant {Array}
   */
  switchOptions: Ember.A([Ember.Object.create({
    label: "Show Correct Answer",
    value: "some-value"
  }),Ember.Object.create({
    label: "Show Performance",
    value: "some-value"
  })])
});
