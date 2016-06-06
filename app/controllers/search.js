import Ember from 'ember';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
import ModalMixin from 'gooru-web/mixins/modal';

export default Ember.Controller.extend(ModalMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  queryParams: ['term', 'taxonomies'],

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Services
  /**
   * @property {Ember.Service} Service to do the search
   */
  searchService: Ember.inject.service('api-sdk/search'),

  /**
   * @requires service:taxonomy
   */
  taxonomyService: Ember.inject.service("taxonomy"),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    setSubject: function(subject){
      const controller = this;
      controller.get('taxonomyService').getCourses(subject).then(function(){
        controller.openTaxonomyModal(subject);
      });
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {string} term filter
   */
  term: null,

  /**
   * @property {string} collection type filter
   */
  collectionType: null,

  /**
   * Configured standards
   * @property {Standard[]}
   */
  standards: null,

  /**
   * These are the collection search results
   * @property {CollectionResult[]}
   */
  collectionResults: null,

  /**
   * Type of collection filter selected
   *  @property {string} selectedFilterType
   *
   */
  selectedFilterType: 'collection',

  /**
   * @property {TaxonomyTagData[]}
   */
  selectedStandards: Ember.A([]),

  /**
   * @property {string} taxonomies query param
   */
  taxonomies: Ember.A([]),

  // -------------------------------------------------------------------------
  // Methods
  openTaxonomyModal: function(subject){
    var component = this;
    var standards = component.get("selectedStandards");
    var subjectStandards = TaxonomyTagData.filterBySubject(subject, standards);
    var notInSubjectStandards = TaxonomyTagData.filterByNotInSubject(subject, standards);
    var model = {
      selected: subjectStandards,
      subject: subject,
      callback: {
        success: function(selectedTags) {
          var dataTags = selectedTags.map(function(taxonomyTag) {
            return taxonomyTag.get('data');
          });
          const standards = Ember.A(dataTags);
          standards.pushObjects(notInSubjectStandards.toArray());
          component.set('selectedStandards', standards);
          component.set('taxonomies', standards.map(function(taxonomyTagData) {
            return taxonomyTagData.get("id");
          }));
        }
      }
    };

    this.actions.showModal.call(this, 'taxonomy.modals.gru-standard-picker', model, null, 'gru-standard-picker');
  }


});
