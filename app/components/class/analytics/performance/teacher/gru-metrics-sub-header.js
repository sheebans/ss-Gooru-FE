import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-metrics-sub-header'],

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * List of  metrics to be displayed by the component
   * @sortType {int} 1 asc, -1 desc, 0 not sort
   * @constant {Array}
   */
  metrics: Ember.A([Ember.Object.create({
    'value': 'score',
    'isSort':false,
    'sortType':0
  }),Ember.Object.create({
    'value': 'completion',
    'isSort':false,
    'sortType':0
  }),Ember.Object.create({
    'value': 'time',
    'isSort':true,
    'sortType':1
  })]),
  // -------------------------------------------------------------------------

  // Methods
});
