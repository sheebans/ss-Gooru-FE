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


  courses:null,


  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods


});
