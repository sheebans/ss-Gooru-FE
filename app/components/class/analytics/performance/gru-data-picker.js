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

  classNames: ['gru-data-picker'],

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
      if (newPerformance.selected===true) {
          this.cleanupOption(newPerformance);
      } else {
        this.selectOption(newPerformance);
      }
      this.sendAction("onChangePerformance", this.get('selectedOptions'));
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
  options: Ember.A([Ember.Object.create({
    'value': 'score',
    'selected':true
  }),Ember.Object.create({
    'value': 'completion',
    'selected':false
  }),Ember.Object.create({
    'value': 'time',
    'selected':false
  }),Ember.Object.create({
    'value': 'reaction',
    'selected':false
  }),Ember.Object.create({
    'value': 'attempt',
    'selected':false
  })]),

  /**
   * @property {String|Function} onChangePerformance - event handler for when the selected performance is changed
   */
  onChangePerformance: null,

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
  isLessThanMaxValue: Ember.computed('max','selectedOptions.length', function() {
      return (this.get('selectedOptions.length') < this.get('max'));
  }),
  /**
   *Computed property to calculate if the length of selectedPerformance is grater than the min value accepted
   *
   * @property
   */
  isGreaterThanMinValue:  Ember.computed('min','selectedOptions.length', function() {
      return (this.get('selectedOptions.length') > this.get('min'));
  }),
  /**
   *Computed property to calculate if the max length of selectedPerformance is equal than the min value accepted
   *
   * @property
   */
  areSingleSelected:Ember.computed('min','max', function() {
    return (this.get('min') === this.get('max'));
  }),
  /**
   *Computed property that return all options selected
   *
   * @property
   */
  selectedOptions :Ember.computed('options.@each.selected',function(){
    return this.get('options').filterBy('selected',true);
  }),


  // -------------------------------------------------------------------------
  // Methods
  /**
   *When unselected a performance option
   *
   */
  cleanupOption: function(performance) {
    if(this.get('isGreaterThanMinValue')){
      performance.set('selected', false);
    }
  },

  /**
   *When select a performance option
   *
   */
  selectOption: function(performanceOption) {
    if(this.get('areSingleSelected')){
      this.cleanSelectedOptions(this.get('selectedOptions'));
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
    performanceOption.set('selected', true);
  },
  cleanSelectedOptions:function(selectedOptions){
    selectedOptions.forEach(function(option){
      option.set("selected", false);
    });
  }
});


