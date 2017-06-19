import Ember from 'ember';
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
   * @property {Boolean} isPublished
   */
  isPublished: null,

  /**
   * @property {Date} Date in which the rubric was published
   */
  publishDate:null,

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
   * @property {boolean} Indicate if a Rubric at question level is ON or not
   */
  rubricOn:false,

  /**
   * @property {string} mimeType
   */
  mimeType:'application/pdf,image/*',

  /**
   * @property {String} owner id
   */
  owner:null,

  /**
   * @property {Date} Date in which the rubric was created
   */
  createdDate:null,

  /**
   * @property {Date} Date in which the rubric was updated
   */
  updatedDate:null,
  /**
   * @property {String} Rubric tenant id
   */
  tenant:null

});
