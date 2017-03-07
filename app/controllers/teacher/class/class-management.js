import Ember from "ember";
/**
 * Class management controller
 *
 * Controller responsible of the logic for the teacher class management tab
 */

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  teacherClassController: Ember.inject.controller('teacher.class'),

  // -------------------------------------------------------------------------
  // Attributes

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Class}
   */
  'class': Ember.computed.alias('teacherClassController.class'),

  /**
   * @property {Course}
   */
  course: Ember.computed.alias('teacherClassController.course')

  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods

});
