import Ember from "ember";
import ModalMixin from 'gooru-web/mixins/modal';
/**
 * Class Overview controller
 *
 * Controller responsible of the logic for the class overview page
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
