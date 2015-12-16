import Ember from 'ember';

/**
 * Teacher Analytics Performance Controller
 *
 * Controller responsible of the logic for the teacher performance
 *
 * @module
 * @see routes/analytics/performance/teacher.js
 * @augments ember/Controller
 */
export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  queryParams: ['filterBy'],

  classController: Ember.inject.controller('class'),

  // -------------------------------------------------------------------------
  // Actions
  actions:{
    /**
     * Triggered when a filter option is selected
     * @param {string} option
     */
    optionsChange:function(options){
      //TO DO
      Ember.log(options);
    },

    /**
     * Triggered when the breadcrumb item is selected
     * @param {*} item
     */
    selectBreadcrumbItem: function(item){
      Ember.log(item);
    },
    /**
     * Triggered when a filter option is selected
     * @param {string} option
     */
    selectFilterBy: function(option){
      this.set("filterBy", option);
    }
  },

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
  /**
   * A link to the parent class controller
   * @see controllers/class.js
   * @property {Class}
   */
  "class": Ember.computed.reads('classController.class'),

  /**
   * The filterBy selected
   * @property {String}
   */
  filterBy: 'assessment',

  breadcrumb: Ember.A([
    {
      value: '111',
      label: 'C1: Course Name'
    },
    {
      value: '222',
      label: 'U1: Unit number one'
    },
    {
      value: '333',
      label: 'L1: Lesson number one'
    },
    {
      value: '444',
      label: 'C1: Collection one with a long name'
    }
  ]),
  /**
   * List of  options specific to teacher to be displayed by the component Data picker
   *
   * Only to validate acceptance criteria 6 "The data picker could received which options are selectable by default"
   *
   * @constant {Array}
   */
  optionsTeacher: Ember.A([Ember.Object.create({
    'value': 'score',
    'selected':true,
    'readOnly':true
  }),Ember.Object.create({
    'value': 'completion',
    'selected':true,
    'readOnly':false
  }),Ember.Object.create({
    'value': 'study-time',
    'selected':true,
    'readOnly':false
  })])

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
