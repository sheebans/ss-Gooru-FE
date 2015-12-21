import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes
  tagName: '',

  classNames: ['gru-metrics-sub-header'],

  // -------------------------------------------------------------------------
  // Actions
  actions:{
    sort: function (metric) {
      this.sortByMetric(metric);
      this.sendAction("onSortChange", metric);
    }
  },
  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {String|Function} onSortChange - event handler for when the selected sort is changed
   */
  onSortChange: null,
  /**
   * List of  metrics to be displayed by the component
   * @sortType {int} 1 asc, -1 desc, 0 not sort
   * @constant {Array}
   */
  metrics: Ember.A([Ember.Object.create({
    'value': 'name',
    'sorted':false,
    'isAsc':false,
    'visible': true
  }),Ember.Object.create({
    'value': 'score',
    'sorted':false,
    'isAsc':false,
    'visible': true
  }),Ember.Object.create({
    'value': 'completion',
    'sorted':false,
    'isAsc':false,
    'visible': true
  }),Ember.Object.create({
    'value': 'study-time',
    'sorted':false,
    'isAsc':false,
    'visible': true
  })]),

  // -------------------------------------------------------------------------

  // Methods
  /**
   * Sort by specific metric
   * @metric {Ember Object}
   *
   */
  sortByMetric(metric){
    var component =this;
    var metrics = component.get("metrics");
    metrics.forEach(function(option){
      if (option.get("value") === metric.get("value")){
        metric.set("sorted", true);
        component.changeTypeSort(metric);
      }else{
        option.set("isAsc", null);
        option.set("sorted", false);
      }
    });
  },
  /**
   * Change the type of sort
   * @metric {Ember Object}
   *
   */
  changeTypeSort(metric){
    metric.set("isAsc",!metric.get("isAsc"));
  }
});
