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
   * @property {Date} Start date of class
   */
  startDate: null,

  /**
   * @property {Date} End date of class
   */
  endDate: null,

  /**
   * @property {String} courseId - The course id of the class
   */
  courseId: null,

  /**
   * @property {String} Creator name
   */
  creatorSystem: null,

  /**
   * @property {Object} Owner information
   */
  owner: Ember.Object.create({}),

  /**
   * @property {Object[]} Collaborators on class
   */
  collaborators: [],

  /**
   * @property {Object[]} Members on class
   */
  members: [],

  /**
   * @property {String} stateId - The class content visibility
   */
  contentVisibility: null,

  /**
   * @property {Boolean} isArchived - Is the class archived?
   */
  isArchived: false,

  /**
   * Verifies if the passed id corresponds to a student in the class
   * @param studentId the student id to search
   * @returns {Boolean} returns true if is a student, otherwise undefined
   */
  isStudent: function(studentId) {
    return this.get('members').findBy('id', studentId);
  },

  /**
   * Verifies if the passed id corresponds to a teacher in the class
   * @param teacherId the teacher id to search
   * @returns {Boolean} returns true if is a teacher, otherwise undefined
   */
  isTeacher: function(teacherId) {
    return (this.get('owner.id') === teacherId || this.get('collaborators').findBy('id', teacherId));
  },

  /**
   * @property {Number} Computed property that counts the number of members in the class
   */
  countMembers: Ember.computed('members', function() {
    return this.get('members.length');
  }),

  /**
   * @property {Number} Computed property that counts the number of teachers in the class
   */
  countTeachers: Ember.computed('owner', 'collaborators', function() {
    let counter = this.get('owner') ? 1 : 0;
    return counter + this.get('collaborators.length');
  }),

  teachers: Ember.computed('owner', 'collaborators', function() {
    let teachers = [];
    if (this.get('owner')) {
      teachers.push(this.get('owner'));
    }
    return teachers.pushObjects(this.get('collaborators'));
  })

});

export default Class;
