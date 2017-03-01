import Ember from 'ember';
import TaxonomySerializer from 'gooru-web/serializers/taxonomy/taxonomy';
import { cleanFilename } from 'gooru-web/utils/utils';

/**
 * Serializer to support the Rubric CRUD operations
 *
 * @typedef {Object} RubricSerializer
 */
export default Ember.Object.extend({


  session: Ember.inject.service('session'),

  /**
   * @property {TaxonomySerializer} taxonomySerializer
   */
  taxonomySerializer: null,

  init: function () {
    this._super(...arguments);
    this.set('taxonomySerializer', TaxonomySerializer.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Serialize a Rubric/Rubric object into a JSON representation required by the Create rubric endpoint
   *
   * @param model - The rubric model to be serialized
   * @returns {Object} JSON Object representation of the rubric model
   */
  serializeCreateRubric: function (model) {
    const serializer = this;
    return {
      'title': model.get('title'),
      'description': model.get('description'),
      'type': model.get('type'),
      'thumbnail': cleanFilename(model.get('thumbnail'), this.get('session.cdnUrls')),
      'metadata': {
        'audience': model.get('hasAudience') ? model.get('audience') : undefined
      },
      'taxonomy': serializer.get('taxonomySerializer').serializeTaxonomy(model.get('taxonomy'))

    };
  }
});
