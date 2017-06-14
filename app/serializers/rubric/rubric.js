import Ember from 'ember';
import TaxonomySerializer from 'gooru-web/serializers/taxonomy/taxonomy';
import { cleanFilename, nullIfEmpty } from 'gooru-web/utils/utils';
import Rubric from 'gooru-web/models/rubric/rubric';
import RubricCategory from 'gooru-web/models/rubric/rubric-category';
import { DEFAULT_IMAGES, TAXONOMY_LEVELS } from "gooru-web/config/config";

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
   * Serializes a Rubric/Rubric object into a JSON representation required by the Create rubric endpoint
   *
   * @param {Rubric} model - The rubric model to be serialized
   * @returns {Object} JSON Object representation of the rubric model
   */
  serializeCreateRubric: function (model) {
    const serializer = this;
    return {
      'title': model.get('title'),
      'description': model.get('description'),
      'type': model.get('type'),
      'is_rubric':true,
      'thumbnail': cleanFilename(model.get('thumbnail'), this.get('session.cdnUrls')),
      'metadata': {
        'audience': model.get('hasAudience') ? model.get('audience') : []
      },
      'taxonomy': serializer.get('taxonomySerializer').serializeTaxonomy(model.get('taxonomy'))
    };
  },

  /**
   * Serializess a Rubric/Rubric object into a JSON representation required by the update rubric endpoint
   *
   * @param {Rubric} model - The rubric model to be serialized
   * @returns {Object} JSON Object representation of the rubric model
   *
   */
  serializeUpdateRubric: function (model) {
    const serializer = this;
    return {
      'title': nullIfEmpty(model.get('title')),
      'description': nullIfEmpty(model.get('description')),
      'thumbnail': cleanFilename(model.get('thumbnail'), this.get('session.cdnUrls')),
      'metadata': {
        'audience': model.get('hasAudience') ? model.get('audience') : undefined
      },
      'taxonomy': serializer.get('taxonomySerializer').serializeTaxonomy(model.get('taxonomy')),
      'url': nullIfEmpty(model.get('url')),
      'is_remote': model.get('uploaded') === true,
      'feedback_guidance': nullIfEmpty(model.get('feedback')),
      'overall_feedback_required': model.get('requiresFeedback') === true,
      'total_points': model.get('totalPoints'),
      'categories': model.get('categories').map(function(category){
        return serializer.serializedUpdateRubricCategory(category);
      })
    };
  },

  /**
   * Serializes a rubric category
   * @param {RubricCategory} model
   * @returns {*} serialized category
   */
  serializedUpdateRubricCategory: function (model) {
    return {
      'category_title': nullIfEmpty(model.get('title')),
      'feedback_guidance': nullIfEmpty(model.get('feedbackGuidance')),
      'required_feedback': model.get('requiresFeedback') === true,
      'level': model.get('allowsLevels') === true,
      'scoring': model.get('allowsScoring') === true,
      'levels': model.get('levels').map(function(level) {
        return { 'level_name': level.name, 'level_score': level.score };
      })
    };
  },

  /**
   * Normalizes an array of rubrics
   *
   * @param payload endpoint response format in JSON format
   * @returns {Rubric[]}
   */
  normalizeGetRubrics: function(payload) {
    const serializer = this;
    if (payload && Ember.isArray(payload)) {
      return payload.map(function(rubric) {
        return serializer.normalizeRubric(rubric);
      });
    } else {
      return [];
    }
  },

  /**
   * Normalizes a rubric
   * @param {*} data
   * @return {Rubric}
   */
  normalizeRubric: function (data,owners) {
    const serializer = this;
    const metadata = data.metadata || {};
    const ownerId = data.creator_id;
    const filteredOwners = Ember.A(owners).filterBy('id', ownerId);
    const categories = data.categories || [];
    const basePath = serializer.get('session.cdnUrls.content');
    const appRootPath = serializer.get('appRootPath'); //configuration appRootPath
    const thumbnail = data.thumbnail ? basePath + data.thumbnail : appRootPath + DEFAULT_IMAGES.RUBRIC;

    return Rubric.create(Ember.getOwner(this).ownerInjection(),{
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      thumbnail: thumbnail,
      taxonomy: serializer.get('taxonomySerializer').normalizeTaxonomyObject(data.taxonomy, TAXONOMY_LEVELS.COURSE),
      audience: metadata.audience,
      url: data.url,
      isPublished: data.publishStatus === 'published',
      uploaded: data.is_remote === true,
      feedback: data.feedback_guidance,
      totalPoints: data.total_points,
      requiresFeedback: data.overall_feedback_required === true,
      categories: categories.map(function(category){
        return serializer.normalizeRubricCategory(category);
      }),
      owner: filteredOwners.get('length') ? filteredOwners.get('firstObject') : null
    });
  },

  /**
   * Normalizes a rubric category
   * @param {*} data
   * @return {RubricCategory}
   *
   */
  normalizeRubricCategory(data) {
    const levels = data.levels || [];
    return RubricCategory.create({
      title: data.category_title,
      feedbackGuidance: data.feedback_guidance,
      requiresFeedback: data.required_feedback,
      allowsLevels: data.level === true,
      allowsScoring: data.scoring === true,
      levels: levels.map(function(level){
        return { name: level.level_name, score: level.level_score };
      })
    });
  }
});
