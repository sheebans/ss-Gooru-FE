import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';
import { DEFAULT_PAGE_SIZE } from 'gooru-web/config/config';

export default Ember.Route.extend(ModalMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {libraryService} Library service object
   */
  libraryService: Ember.inject.service('api-sdk/library'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * On card play resource button click
     * @param {Resource} resource
     */
    playResource: function (resource) {
      this.transitionTo('content.resources.play', resource.get('id'));
    }

  },

  // -------------------------------------------------------------------------
  // Methods

  model: function() {
    const libraryId = this.paramsFor('partner-library').id;
    return this.get('libraryService').fetchLibraryContent(libraryId,
      'resource', DEFAULT_PAGE_SIZE).then(function(resources) {
        return Ember.RSVP.hash({
          libraryId,
          resources: resources.libraryContent.resources,
          owners: resources.libraryContent.ownerDetails
        });
    });
  },

  setupController: function (controller, model) {
    controller.set('libraryId', model.libraryId);
    controller.set('resources', controller.mapOwners(model.resources,
      model.owners));
  }

});
