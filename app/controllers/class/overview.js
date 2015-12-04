import Ember from "ember";

/**
 * Class Overview controller
 *
 * Controller responsible of the logic for the class overview page
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

  /**
   * All units by class and course
   * @property {Unit[]}
   */
  units:null,

  /**
   * All visible units
   * @property {Unit[]}
   */
  visibleUnits:Ember.computed('units',function(){
    return  this.get('units').filterBy("visibility",true);
  })

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods


});
