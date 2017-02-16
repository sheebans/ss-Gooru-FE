import Ember from "ember";
import ModalMixin from 'gooru-web/mixins/modal';
/**
 * Classmates Information controller
 *
 * Controller responsible of the logic for the classmates information page
 */
export default Ember.Controller.extend(ModalMixin,{

  // -------------------------------------------------------------------------
  // Dependencies
  classController: Ember.inject.controller('student.class'),

  /**
   * @requires service:api-sdk/class
   */
  classService: Ember.inject.service("api-sdk/class"),

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * A link to the parent class controller
   * @see controllers/student/class.js
   * @property {Class}
   */
  class: Ember.computed.alias('classController.class')
  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods
});
