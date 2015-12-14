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
  classController: Ember.inject.controller('class'),

  // -------------------------------------------------------------------------
  // Actions

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
  ])

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
