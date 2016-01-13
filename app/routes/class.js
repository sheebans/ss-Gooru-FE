import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Session} current session
   */
  session: Ember.inject.service("session"),

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
     */
    selectMenuItem: function(item){
      const route = this;
      const controller = route.get("controller");
      const currentMenuItem = controller.get("menuItem");
      const aClass = controller.get('class');
      const isTeacher = aClass.isTeacher(this.get("session.userId"));
      controller.selectMenuItem(item);

      //if (currentMenuItem !== item) {
        if ((item === "analytics.performance") && isTeacher){
          route.transitionTo('class.analytics.performance.teacher.course');
        }
        else {
          route.transitionTo('class.' + item);
        }
      //}
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
