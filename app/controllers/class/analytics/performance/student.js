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

  queryParams: ['filterBy', 'unitId', 'lessonId'],

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

    updateLocation:function(newLocation, type){
      const location = !newLocation ? undefined : newLocation;
      if(type==='lesson'){
        this.set('lessonId',location);
      }else if(type==='unit'){
        this.set('unitId',location);
      }
    },
    /**
     * Triggered when the breadcrumb item is selected
     * @param {*} item
     */
    selectBreadcrumbItem: function(item){
      Ember.log(item);
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
   * @property {Ember.Array}
   */
  "performances": null,

  /**
   * The selected option from the data picker.
   * @property {String}
   */
  selectedOption: 'score',

  /**
   * The current selected class model for the student
   * @property {Class}
   */
  "classModel":null,
  /**
   * The userId for the student
   * @property {String}
   */
  userId:'',
  /**
   * The unitId for the current unit
   * @property {String}
   *
  unitId:'',

  /**
   * The lessonId for the current lesson
   * @property {String}
   *
  lessonId:'',

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
  ]),
  /**
   * Boolean that determines whether the route model has not finished loading.
   * @property {Boolean}
   */
  currentlyLoading:null
  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
