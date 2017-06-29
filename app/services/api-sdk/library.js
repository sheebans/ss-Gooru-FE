import Ember from 'ember';
import LibrarySerializer from 'gooru-web/serializers/library/library';
import LibraryAdapter from 'gooru-web/adapters/library/library';

/**
 * @typedef {Object} LibraryService
 */
export default Ember.Service.extend({

  /**
   * @property {LibrarySerializer} librarySerializer
   */
  librarySerializer: null,

  /**
   * @property {LibraryAdapter} libraryAdapter
   */
  libraryAdapter: null,

  init: function () {
    this._super(...arguments);
    this.set('librarySerializer', LibrarySerializer.create(Ember.getOwner(this).ownerInjection()));
    this.set('libraryAdapter', LibraryAdapter.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Fetches the libraries
   *
   * @returns {Promise}
   */
  fetchLibraries: function() {
    const service = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('libraryAdapter').fetchLibraries()
      .then(
        response => resolve(service.get('librarySerializer').normalizeFetchLibraries(response)),
        reject
      );
    });
  }
});
