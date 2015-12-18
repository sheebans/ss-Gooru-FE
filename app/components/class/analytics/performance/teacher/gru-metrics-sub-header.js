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
   * List of  metrics to be displayed by the component
   * @sortType {int} 1 asc, -1 desc, 0 not sort
   * @constant {Array}
   */
  metrics: Ember.A([Ember.Object.create({
    'value': 'score',
    'isSort':false,
    'asc':null
  }),Ember.Object.create({
    'value': 'completion',
    'isSort':false,
    'asc':null
  }),Ember.Object.create({
    'value': 'time',
    'isSort':false,
    'asc':null
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
      if (option.get("value") == metric.get("value")){
        metric.set("isSort", true);
        component.changeTypeSort(metric);
      }else{
        option.set("asc", null);
        option.set("isSort", false);
      }
    });
  },
  /**
   * Change the type of sort
   * @metric {Ember Object}
   *
   */
  changeTypeSort(metric){
    if(metric.get("asc")==false){
      metric.set("asc", null);
      metric.set("isSort", false);
    }else{
      if(metric.asc==null){
        metric.set("asc", true);
      }else{
        metric.set("asc",false);
      }
    }
  }
});
