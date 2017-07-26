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
     * On card remix collection button click
     * @param {Collection} collection
     */
    remixCollection: function (collection) {
      var remixModel = {
        content: collection
      };
      this.send('showModal', 'content.modals.gru-collection-remix', remixModel);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  model: function() {
    const libraryId = this.paramsFor('partner-library').id;
    return this.get('libraryService').fetchLibraryContent(libraryId,
      'collection', DEFAULT_PAGE_SIZE).then(function(collections) {
        return Ember.RSVP.hash({
          libraryId,
          collections: collections.libraryContent.collections,
          owners: collections.libraryContent.ownerDetails
        });
    });
  },

  setupController: function (controller, model) {
    controller.set('libraryId', model.libraryId);
    controller.set('collections', controller.mapOwners(model.collections,
      model.owners));
  }

});
