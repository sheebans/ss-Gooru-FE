import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';

/**
 * Partner library route
 *
 * @module
 * @augments Ember.Route
 */

export default Ember.Route.extend(PrivateRouteMixin, {

  queryParams: {
    refresh: {
      refreshModel: true
    }
  },

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {libraryService} Library service object
   */
  libraryService: Ember.inject.service('api-sdk/library'),

  // -------------------------------------------------------------------------
  // Methods

  model: function(params) {
    const libraryId = params.id;
    return Ember.RSVP.hash({
      library: this.get('libraryService').fetchById(libraryId)
    });
  },

  setupController: function (controller, model) {
    controller.set('library', model.library);
  }
});
