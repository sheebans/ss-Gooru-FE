import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service("api-sdk/class"),


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  /**
   * Get model for the controller
   */
  model: function(params) {
    const selectedClass = this.get("classService").findById(params.classId);

    return Ember.RSVP.hash({
      class: selectedClass
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    const selectedClass = model.class;
    controller.set("class", selectedClass);
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Triggered when a class menu item is selected
     * @param {string} item
     * @param {boolean} transition indicates if it is necessary to transition
     */
    selectMenuItem: function(item, transition = true){
      const route = this;
      const currentMenuItem = route.get("controller.menuItem");

      route.set("controller.menuItem", item);
      if (currentMenuItem !== item && transition) {
        route.transitionTo('class.' + item);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events
  /**
   * This event handlers reset some class properties when leaving the route
   */
  handleDeactivate: function() {
    this.get("controller").exitFullScreen();
  }.on('deactivate')

});
