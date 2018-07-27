import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['cards', 'suggest-assessment-card'],

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
   * assessment object
   * @type {Object}
   */
  assessment: null,

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('assessment.standards.[]', function() {
    let standards = this.get('assessment.standards');
    standards = standards.filter(function(standard) {
      // Filter out learning targets (they're too long for the card)
      return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
    });
    return TaxonomyTag.getTaxonomyTags(standards);
  }),

  actions: {
    /**
     * Action triggered when the user play assessment
     * It'll open the player in new tab
     */
    /*    onPlayAssessment(assessmentId) {
      // handle player logic here ....
    } */
  }
});
