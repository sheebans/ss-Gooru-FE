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
  },

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties

  class: null,
  courses:null,
  modelForCoursesModal: Ember.computed('class', 'courses', function() {
    return Ember.Object.create({
      'classId': this.get('class.class.id'),
      'courses': this.get('courses')
    });
  }),
  modelForFeaturedCoursesModal: Ember.computed('class', 'featuredCourses', function(){
    return Ember.Object.create({
      'classId': this.get('class.class.id'),
      'courses': this.get('featuredCourses'),
      'areFeatured':true
    });
  }),

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods


});
