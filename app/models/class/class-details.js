import Ember from 'ember';

/**
 * Class model
 *
 * @typedef {Object} ClassModel
 */
export default Ember.Object.extend({

  /**
   * @property {string} id - The profile id
   */
  id: null,

  /**
   * @property {string} creatorId - The id of the creator
   */
  creatorId: null,

  /**
   * @property {string} title - The class title
   */
  title: null,

  /**
   * @property {string} description - The class description
   */
  description: null,

  /**
   * @property {string} greeting - The class greeting message
   */
  greeting: null,

  /**
   * @property {string[]} grade - The class grade
   */
  grade: null,

  /**
   * @property {string} classSharing - Class sharing option
   */
  classSharing: null,

  /**
   * @property {string} coverImage - Class cover image
   */
  coverImage: null,

  /**
   * @property {string} code - The class code
   */
  code: null,

  /**
   * @property {number} minScore - The class minimum score
   */
  minScore: null,

  /**
   * @property {date} endDate - The class end date
   */
  endDate: null,

  /**
   * @property {string} courseId - The course id of the class
   */
  courseId: null,

  /**
   * @property {string} collaborator - The collaborator of the class
   */
  collaborator: null,

  /**
   * @property {number} gooruVersion - The API version in which the class was created
   */
  gooruVersion: null,

  /**
   * @property {string} stateId - The class content visibility
   */
  contentVisibility: null,

  /**
   * @property {string} isArchived - Is the class archived?
   */
  isArchived: null
});