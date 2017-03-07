import Ember from 'ember';
import { RUBRIC_TYPE } from 'gooru-web/config/config';


/**
 * Rubric model
 *
 * @typedef {Object} Rubric
 */
export default Ember.Object.extend({

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
  audience:[],

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
  categories: [],

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
  uploaded: null,

  /**
   * @property {string} feedback guidance
   */
  feedback: null,

 /**
   * @property {number} total points
   */
  totalPoints: null,

  /**
   * @property {boolean} true when the rubric requires feedback
   */
  requiresFeedback: null
});