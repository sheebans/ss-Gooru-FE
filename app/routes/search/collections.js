import Ember from 'ember';

/**
 * @typedef {object} SearchCollectionsController
 */
export default Ember.Route.extend({

  /**
   * @property {[]} query params supported
   */
  queryParams: {
    term: {
      refreshModel: true
    },
    grades: 'grades',
    subjectsId: 'subjectsId'
  },

  /**
   * @property {string} term filter
   */
  term: null,

  /**
   * @property {string} subjects filter
   */
  subjects: null,

  /**
   * @property {string} collections filter
   */
  collections: null,


  /**
   * @property {SubjectService} Service to retrieve subjects
   */
  subjectService: Ember.inject.service('api-sdk/subject'),

  /**
   * @property {SearchService} Service to do the search
   */
  searchService: Ember.inject.service('api-sdk/search'),

  model: function(params) {
    var subjects = this.get('subjectService').readAll();
    var collectionResults = this.get('searchService').searchCollections(params);
    return Ember.RSVP.hash({
      subjects: subjects,
      collectionResults: collectionResults
    });
  },
  /**
   * Set all controller properties used in the template
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    this._super(controller, model);
    // @TODO We are filtering by library == 'library value, we need to verify if this is the correct filter value.
    controller.set('subjects', model.subjects.filterBy('library', 'library'));
    controller.set('collectionResults', model.collectionResults);
  }

});
