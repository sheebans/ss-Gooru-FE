import Ember from 'ember';
import { RUBRIC_TYPE } from 'gooru-web/config/config';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: {
    validators: [
      validator('presence', {
        presence: true,
        message: '{{description}}',
        descriptionKey: 'common.errors.rubric-title-presence'
      })
    ]
  }
});
/**
 * Rubric model
 *
 * @typedef {Object} Rubric
 */
export default Ember.Object.extend(Validations,{

  /**
   * @property {String} id
   */
  id: null,

  /**
   * @property {String} title
   */
  title: null,

  /**
   * @property {String} description
   */
  description: null,

  /**
   * @property {String} thumbnail
   */
  thumbnail: null,

  /**
   * @property {TaxonomyRoot} Taxonomy primary subject
   */
  subject: null,

  /**
   * @property {Number[]} Array with the audience ids
   */
  audience:Ember.A([]),

  /**
   * @property {boolean}
   */
  hasAudience: Ember.computed.bool('audience.length'),


  /**
   * @property {boolean}
   */
  is1xN: Ember.computed.equal('type', RUBRIC_TYPE._1xN),

  /**
   * @property {boolean}
   */
  isNxN: Ember.computed.equal('type', RUBRIC_TYPE.NxN),

  /**
   * @property {RubricCategory[]}
   */
  categories: Ember.A([]),

  /**
   * @property {boolean}
   */
  hasCategories: Ember.computed.bool('categories.length'),

  /**
   * @property {string} rubric url when uploading a file
   */
  url: null,

  /**
   * @property {boolean} true when a rubric file is uploaded
   */
  uploaded: false,

  /**
   * @property {string} feedback guidance
   */
  feedback: null,

  /**
   * @property {TaxonomyTagData[]} Rubric standards array
   */
  standards: Ember.A([]),

 /**
   * @property {number} total points
   */
  totalPoints: null,

  /**
   * @property {boolean} true when the rubric requires feedback
   */
  requiresFeedback: true,

  /**
   * @property {string} mimeType
   */
  mimeType:'application/pdf,image/*'
});
