import Ember from 'ember';

/**
 * Teacher Analytics Performance Route
 *
 * Route responsible of the transitions and loading the model/data for the teacher class performance
 *
 * @module
 * @augments ember/Controller
 */
export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Triggered when the breadcrumb item is selected
     * @param {*} item
     */
    selectBreadcrumbItem: function(item){
      const type = item.get('value').type;
      const itemId = item.get('value').id;
      const breadcrumbLink = 'class.analytics.performance.teacher.' + type;

      if (type == 'course') {
        this.transitionTo(breadcrumbLink);
      }
      else {
        this.transitionTo(breadcrumbLink, itemId);
      }
      console.log('f teacher',type);
    },
  },

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function() {

  },

  /**
   * Set all controller properties from the model
   * @param controller
   */
  setupController: function(controller) {
    controller.get('classController').selectMenuItem('analytics.performance');
  }
});
