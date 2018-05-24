import Ember from 'ember';

/**
 * Class Overview controller
 *
 * Controller responsible of the logic for the class overview page
 */

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  classController: Ember.inject.controller('teacher.class'),

  // -------------------------------------------------------------------------
  // Attributes

  queryParams: ['location'],

  /**
   * Combination of unit, lesson and resource (collection or assessment)
   * separated by a plus sign
   * @example
   * location='uId001+lId002+cId003'
   */
  location: '',

  isFirstLoad: true,

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
    updateLocation: function(newLocation) {
      this.set('location', newLocation ? newLocation : null);
    },
    /**
     * Trigger action to update content visibility list
     */
    updateContentVisibility: function(contentId, visible) {
      this.send('updateContentVisible', contentId, visible);
    },

    /**
     * Triggered when a close welcome panel button is selected.
     */
    toggleHeader: function() {
      this.set('showWelcome', false);
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
  class: Ember.computed.alias('classController.class'),

  /**
   * @property {Course} the selected course
   */
  course: null,

  /**
   * A link to the content visibility from class controller
   * @see controllers/class.js
   * @property {Class}
   */
  contentVisibility: Ember.computed.alias('classController.contentVisibility'),

  /**
   * @property {boolean} showWelcome - indicates the toggle welcome panel state, true means open, false means closed
   */
  showWelcome: true,

  /**
   * @type {Boolean}
   * Property to check whether a class is rescoped
   */
  isRescopedClass: Ember.computed('class', function() {
    let controller = this;
    const currentClass = controller.get('class');
    let setting = currentClass.get('setting');
    return setting ? setting.rescope : false;
  })

  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods
});
