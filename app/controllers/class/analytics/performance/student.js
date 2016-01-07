import Ember from 'ember';
import {download} from 'gooru-web/utils/csv';

/**
 * Student Analytics Performance Controller
 *
 * Controller responsible of the logic for the student performance
 *
 * @module
 * @see routes/analytics/performance/student.js
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
    selectFilterBy: function(option){
      this.set("filterBy", option);
    },

    optionsChange:function(options){
      this.set('selectedOption',options[0].get("value"));
    },

    /**
     * Triggered when the breadcrumb item is selected
     * @param {*} item
     */
    selectBreadcrumbItem: function(item){
      Ember.log(item);
    },

    /**
     * Triggered when selecting a unit
     * @param {Unit} unit
     * @param {number} index
     */
    setUnitBreadcrumb: function(unit, index){
      const controller = this;
      let breadcrumb = controller.get('breadcrumb');
      controller.updateBreadcrumbToUnit(breadcrumb, unit, ++index);
    },

    /**
     * When clicking at the download button
     */
    download: function(){
      const data = {
        fields: ['First Name', "Last Name"],
        data: [
          ['Javier', 'P'],
          ['David', 'P']
        ]
      };
      const fileName = "student-performance";
      //Data and File name are examples at this point
      download(fileName, data);
    },

    /**
     * Triggered when the user toggles between normal and full screen mode
     */
    toggleFullScreen: function () {
      return this.get("classController").toggleFullScreen();
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
   * The performances for the units that will be shown to the user
   * @property {Class}
   */
  "performances": null,

  /**
   * The selected option from the data picker.
   * @property {Class}
   */
  selectedOption: 'score',

  /**
   * The current selected class model for the student
   * @property {Class}
   */
  "classModel":null,
  /**
   * The userId for the student
   * @property {Class}
   */
  userId:'',

  /**
   * The filterBy selected
   * @property {String}
   */
  filterBy: 'assessment',

  /**
   * If analytics is fullscreen
   * @property {Boolean}
   */
  isFullScreen:  Ember.computed.alias('classController.isFullScreen'),

  breadcrumb: Ember.A([
    {
      value: '111',
      label: 'Course Name'
    }
  ])
  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
