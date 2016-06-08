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
    loadSelected(selected) {
      if (selected.length) {
        let coursesToLoad = [], domainsToLoad = [], pathsToLoad = [], promises = [];
        let subject = this.get('model.subject');
        let taxonomyService = this.get('taxonomyService');

        selected.forEach(function(tagData) {
          var path = tagData.get('ancestorsPath');

          // Create non-duplicated lists of domains and standards to load
          if (coursesToLoad.indexOf(path[0]) === -1) {
            coursesToLoad.push(path[0]);
          }

          if (domainsToLoad.indexOf(path[1]) === -1) {
            domainsToLoad.push(path[1]);
            pathsToLoad.push(path);
          }
        });

        promises = coursesToLoad.map(function(courseId) {
          return taxonomyService.getCourseDomains(subject, courseId);
        });

        return Ember.RSVP.all(promises).then(function() {
          promises = pathsToLoad.map(function(path) {
            return taxonomyService.getDomainCodes(subject, path[0], path[1]);
          });

          return Ember.RSVP.all(promises);
        });
      } else {
        return Ember.RSVP.resolve(false);
      }
    },

    loadTaxonomyData(path) {
      return new Ember.RSVP.Promise(function(resolve) {
        var subject = this.get('model.subject');
        var taxonomyService = this.get('taxonomyService');

        if (path.length > 1) {
          let courseId = path[0];
          let domainId = path[1];
          taxonomyService.getCourseDomains(subject, courseId).then(function() {
            taxonomyService.getDomainCodes(subject, courseId, domainId)
              .then(function(standards) {
                resolve(standards);
              });
          });
        } else {
          let courseId = path[0];
          taxonomyService.getCourseDomains(subject, courseId)
            .then(function(domains) {
              resolve(domains);
            });
        }
      }.bind(this));
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
