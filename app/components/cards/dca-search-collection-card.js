import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['cards', 'dca-search-collection-card'],

  // -------------------------------------------------------------------------
  // Events
  didRender() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * collection object
   * @type {Object}
   */
  collection: null,

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('collection.standards.[]', function() {
    let standards = this.get('collection.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
      return TaxonomyTag.getTaxonomyTags(standards);
    }
  }),

  /**
   * Maintains collection type
   * @type {String}
   */
  contentType: null,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the user play collection
     * It'll open the player in new tab
     */
    onPlayCollection(collectionId) {
      let collectionUrl = `${window.location.origin}/player/${collectionId}`;
      window.open(collectionUrl);
    },

    onAddCollectionToDCA(collection) {
      this.sendAction('onAddContentToDCA', collection);
    }
  }
});
