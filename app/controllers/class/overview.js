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
  // Attributes

  queryParams: ['location'],

  /**
   * Combination of unit, lesson and resource (collection or assessment)
   * separated by a plus sign
   * @example
   * location='uId001+lId002+cId003'
   */
  location: null,

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * Update 'location' (bound query param)
     *
     * @function
     * @param {String} newLocation - String of the form 'unitId[+lessonId[+resourceId]]'
     * @returns {undefined}
     */
    updateLocation: function (newLocation) {
      var location = !newLocation ? null : newLocation;
      this.set('location', location);
    },

    /**
     * Action triggered when the user as teacher selects the Edit Content option
     */
    editContent:function(){
      //TO DO
      Ember.Logger.log("edit content");
    }
  },

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @prop {String} userLocation - Location of a user in a course
   * String of the form 'unitId[+lessonId[+resourceId]]'
   */
  userLocation: null,

  /**
   * A link to the parent class controller
   * @see controllers/class.js
   * @property {Class}
   */
  "class": Ember.computed.reads('classController.class')

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods


});
