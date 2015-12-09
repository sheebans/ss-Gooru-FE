import Ember from 'ember';
/**
 *Performance Data Picker
 *
 *  Component responsible for letting the user select and update a performance option
 *  from a predefined list of options to display different analytic data.
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-performance-data-picker'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Set a new performance as selected and update the component appearance accordingly
     *
     * @function actions:setPerformance
     * @param {string} newPerformance - newly selected performance
     * @returns {undefined}
     */
    setPerformance: function(newPerformance) {
      if (this.get('selectedPerformance').contains(newPerformance.value)) {
          this.cleanupPerformance(newPerformance);
      } else {
        this.selectPerformanceOption(newPerformance);
      }
      this.sendAction("onChangePerformance", this.get('selectedPerformance'));
    }
  },
  // -------------------------------------------------------------------------
  // Events

// -------------------------------------------------------------------------
// Properties

  /**
   * List of performance options to be displayed by the component
   *
   * @constant {Array}
   */
  options: Ember.A([{
    'value': 'score',
    'selected':true
  },{
    'value': 'completion',
    'selected':false
  },{
    'value': 'time',
    'selected':false
  },{
    'value': 'reaction',
    'selected':false
  },{
    'value': 'attempt',
    'selected':false
  }]),

  /**
   * @property {String|Function} onChangePerformance - event handler for when the selected performance is changed
   */
  onChangePerformance: null,

  /**
   * @property {[]} selectedPerformance - selected performance
   */
  selectedPerformance: Ember.A(['score']),

  /**
   * Min options for select
   *
   * @constant {Number}
   */
    min:1,

  /**
   * Max options for select
   *
   * @property {Number}
   */
    max:1,

  /**
   *Computed property to calculate if the length of selectedPerformance is less than the max value accepted
   *
   * @property
   */
  isLessThanMaxValue: Ember.computed('max','selectedPerformance.length', function() {
      return (this.selectedPerformance.length < this.max);
  }),
  /**
   *Computed property to calculate if the length of selectedPerformance is grater than the min value accepted
   *
   * @property
   */
  isGreaterThanMinValue:  Ember.computed('min','selectedPerformance.length', function() {
      return (this.selectedPerformance.length > this.min);
  }),
  /**
   *Computed property to calculate if the max length of selectedPerformance is equal than the min value accepted
   *
   * @property
   */
  areEqualValues:Ember.computed('min','max', function() {
    return (this.min === this.max);
  }),


  // -------------------------------------------------------------------------
  // Methods
  /**
   *When unselected a performance option
   *
   */
  cleanupPerformance: function(performance) {
    if(this.get('isGreaterThanMinValue')){
      Ember.set(performance,'selected',!performance.selected);
      this.get('selectedPerformance').removeObject(performance.value);
    }
  },

  /**
   *When select a performance option
   *
   */
  selectPerformanceOption: function(performanceOption) {
    if(this.get('areEqualValues')){
      this.get('selectedPerformance').pop();
      Ember.set(this.get('options').findBy('selected',true),'selected',false);
      this.addOption(performanceOption);
    }else{
      if(this.get('isLessThanMaxValue')){
       this.addOption(performanceOption);
      }
    }
  },

  /**
   *Add option in SelectedPerformance array
   *
   */
  addOption:function(performanceOption){
    Ember.set(performanceOption,'selected',!performanceOption.selected);
    this.get('selectedPerformance').addObject(performanceOption.value);
  }
});


