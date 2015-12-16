import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Open the player with the specific collection/assessment
     *
     * @function actions:playItem
     * @param {string} collectionId - Identifier for a collection or assessment
     */
    playItem: function(collectionId){
      this.transitionTo('player', collectionId);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(/* controller, model */) {
    this.send("selectMenuItem", 'overview', false);
  }
});
