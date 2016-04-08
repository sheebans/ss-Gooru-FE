import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  //TO DO We need to use i18n for error messages
  title: validator('presence', {
    presence: true,
    message: 'Please give your class a name'
  }),
  classSharing: validator('presence', true)
});

/**
 * CLass model
 * typedef {Object} Class
 */
const Class = Ember.Object.extend(Validations, {
  /**
   * @property {String} id - The profile id
   */
  id: null,

  /**
   * @property {String} creatorId - The id of the creator
   */
  creatorId: null,

  /**
   * @property {String} Title of the class
   */
  title: null,

  /**
   * @property {String} Description for class
   */
  description: null,

  /**
   * @property {String} Greetings for class
   */
  greeting: null,

  /**
   * @property {Number[]} Grade for class
   */
  grade: [],

  /**
   * @property  {String} Sharing type of the class. Either “open” or “restricted”
   */
  classSharing: null,

  /**
   * @property {String} Path to the cover image of the class
   */
  coverImage: null,

  /**
   * @property {String} code - The class code
   */
  code: null,

  /**
   * @property {String} Minimum score for class.
   */
  minScore: null,

  /**
   * @property {Date} End date of class
   */
  endDate: null,

  /**
   * @property {String} courseId - The course id of the class
   */
  courseId: null,

  /**
   * @property {Array} Collaborators on class
   */
  collaborator: [],

  /**
   * @property {String} Creator name
   */
  creatorSystem: null,

  /**
   * @property {String} stateId - The class content visibility
   */
  contentVisibility: null,

  /**
   * @property {Boolean} isArchived - Is the class archived?
   */
  isArchived: false,

  /**
   * @property {Boolean} isStudent - The user is student in the class
   */
  isStudent: false,

  /**
   * @property {Boolean} isStudent - The user is teacher in the class
   */
  isTeacher: Ember.computed('isStudent', function () {
    return !this.get('isStudent');
  })

});

export default Class;
