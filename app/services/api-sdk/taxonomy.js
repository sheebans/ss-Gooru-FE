import Ember from 'ember';
import TaxonomySerializer from 'gooru-web/serializers/taxonomy/taxonomy';
import TaxonomyAdapter from 'gooru-web/adapters/taxonomy/taxonomy';

/**
 * Service for the Taxonomies
 *
 * @typedef {Object} TaxonomyService
 */
export default Ember.Service.extend({

  taxonomySerializer: null,

  taxonomyAdapter: null,


  init: function () {
    this._super(...arguments);
    this.set('taxonomySerializer', TaxonomySerializer.create(Ember.getOwner(this).ownerInjection()));
    this.set('taxonomyAdapter', TaxonomyAdapter.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Fetches the Taxonomy Subjects
   *
   * @param type the subjects type
   * @returns {Promise}
   */
  fetchSubjects: function(type) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('taxonomyAdapter').fetchSubjects(type)
        .then(function(response) {
          resolve(service.get('taxonomySerializer').normalizeSubjects(response));
        }, function(error) {
          reject(error);
        });
    });
  }

});
