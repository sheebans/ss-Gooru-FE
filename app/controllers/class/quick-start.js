import Ember from "ember";
import ModalMixin from 'gooru-web/mixins/modal';
/**
 * Class quick start controller
 *
 * Controller responsible of the logic for the class quick start page
 */
export default Ember.Controller.extend(ModalMixin,{

  // -------------------------------------------------------------------------
  // Dependencies
  classController: Ember.inject.controller('class'),

  classService: Ember.inject.service('api-sdk/class'),


  // -------------------------------------------------------------------------
  // Attributes


  // -------------------------------------------------------------------------
  // Actions
  actions: {
    addCourseToClass:function(courseId){
      console.log(this.get('class'));      
      //this.get('classService').associateCourseToClass(courseId, this.get('class.id'));
    }
  },

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
  modalTarget: Ember.computed(function(){
    return this;
  }),
  class: null,
  courses:null,
  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods


});
