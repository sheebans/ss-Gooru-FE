import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';

export default Ember.Controller.extend({


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('rubric.standards.[]', function() {
    return TaxonomyTag.getTaxonomyTags(this.get('rubric.standards'), false);
  })

});
