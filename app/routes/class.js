import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  queryParams: {
    'menuItem' : {
      replace: true
    }
  },

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
    const
      menuItem = params.menuItem,
      selectedClass = this.get("classService").findById(params.classId);

    return Ember.RSVP.hash({
      class: selectedClass,
      menuItem: menuItem
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    const
      selectedClass = model.class,
      menuItem = (model.menuItem)? model.menuItem: 'information';

    controller.set("class", selectedClass);
    controller.set("menuItem", menuItem);
  }
});
