import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

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
   * Default list of  metrics to be displayed by the component
   * @sorted {Boolean}
   * @isAsc {Boolean}
   * @visible {Boolean}
   * @constant {Array}
   */
  metrics: Ember.A([Ember.Object.create({
    'value': 'score',
    'sorted':false,
    'isAsc':false,
    'visible': true
  }),Ember.Object.create({
    'value': 'completion',
    'sorted':false,
    'isAsc':false,
    'visible': false
  }),Ember.Object.create({
    'value': 'study-time',
    'sorted':false,
    'isAsc':false,
    'visible': false
  })]),

  /**
   * List of selected options from the data picker.
   * @property {Array}
   */
  dataPickerOptions: Ember.A(["score"]),

  /**
   * List of  visible metrics to be displayed
   * @property {Array}
   */
  visibleMetrics: Ember.computed('dataPickerOptions.[]', function() {
    var dataPickerOptions = this.get('dataPickerOptions');

    this.showMetric('completion', dataPickerOptions.contains('completion'));
    this.showMetric('study-time', dataPickerOptions.contains('study-time'));

    return this.get('metrics');

  }),

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
   * show/hide metric by specific data picker selected option
   * @metric {Ember Object}
   *
   */
  showMetric(metric, show){
    var component =this;
    var metrics = component.get("metrics");
    metrics.forEach(function(option){
      if (option.get("value") === metric){
        option.set("visible", show);
      }
    });
    component.set("metrics", metrics);
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
