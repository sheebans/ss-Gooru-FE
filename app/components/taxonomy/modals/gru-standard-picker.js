import Ember from 'ember';
import BrowseItem from 'gooru-web/models/taxonomy/browse-item';
/**
 * Standard Picker
 *
 * Component responsible for displaying three panels (course, domain and standards) for a tree
 * of browse items. Uses @see ../gru-taxonomy-picker
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  /**
   * @requires service:api-sdk/taxonomy
   */
  taxonomyService: Ember.inject.service("taxonomy"),


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['taxonomy', 'modals', 'gru-standard-picker'],


  // -------------------------------------------------------------------------
  // Actions

  actions: {
    loadTaxonomyData(path, parentBrowseItem) {
      var subject = this.get('model.subject');
      var taxonomyService = this.get('taxonomyService');

      if (path.length > 1) {
        let courseId = path[0];
        let domainId = path[1];
        return taxonomyService.getCourseDomains(subject, courseId).then(function() {
          return taxonomyService.getDomainCodes(subject, courseId, domainId)
                  .then(function(standards) {
                    if (parentBrowseItem && !parentBrowseItem.get('children').length) {
                      // Add children to the parent browse item
                      let browseItems = [];
                      standards.forEach(function(taxonomyItem) {
                        var browseItem = BrowseItem.createFromTaxonomyItem(taxonomyItem);
                        browseItem.set('parent', parentBrowseItem);
                        browseItems.push(browseItem);
                      });
                      parentBrowseItem.set('children', browseItems);
                    }
                  });
        });
      } else {
        let courseId = path[0];
        return taxonomyService.getCourseDomains(subject, courseId)
                .then(function(domains) {
                  if (parentBrowseItem && !parentBrowseItem.get('children').length) {
                    // Add children to the parent browse item
                    let browseItems = [];
                    domains.forEach(function(taxonomyItem) {
                      var browseItem = BrowseItem.createFromTaxonomyItem(taxonomyItem);
                      browseItem.set('parent', parentBrowseItem);
                      browseItems.push(browseItem);
                    });
                    parentBrowseItem.set('children', browseItems);
                  }
                });
      }
    },

    updateSelectedTags(selectedTags) {
      this.get('model.callback').success(selectedTags);
      this.triggerAction({ action: 'closeModal' });
    }
  },


  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super( ...arguments );

    this.set('panelHeaders', [
      this.get('i18n').t('common.course').string,
      this.get('i18n').t('common.domain').string,
      this.get('i18n').t('common.standard').string
    ]);
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Object with necessary picker information:
   * - callback: {Object} Callback object made up of two properties: success and fail
   *             callback.success will be called on the 'updateSelectedTags' action.
   * - selected: {TaxonomyTagData[]} List of references to a set of taxonomy tag data
   * - subject: {TaxonomyRoot} Currently selected subject
   * @prop {Object}
   */
  model: null,

  /**
   * Headers to display at the top of each one of the panels (course, domain
   * and standards). There *must* be one for each panel.
   * @prop {String[]}
   */
  panelHeaders: []

});
