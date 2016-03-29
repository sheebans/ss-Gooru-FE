import Ember from 'ember';

/**
 * Profile model with the user account information
 *
 * @typedef {Object} ProfileModel
 */
export default Ember.Object.extend({

  /**
   * @property {string} id - The profile id
   */
  id: null,

  /**
   * @property {string} firstName - The profile first name
   */
  firstName: null,

  /**
   * @property {string} lastName - The profile last name
   */
  lastName: null,

  /**
   * @property {string} username - The profile username
   */
  username: null,

  /**
   * @property {string} email - The profile email
   */
  email: null,

  /**
   * @property {string[]} grades - An arrays of string with the grades of the profile
   */
  grades: [],

  /**
   * @property {date} dateOfBirth - The profile date of birth
   */
  dateOfBirth: null,

  /**
   * @property {string} role - The profile role (teacher, student, etc)
   */
  role: null,

  /**
   * @property {date} lastUpdate - The last profile modification date
   */
  lastUpdate: null,

  /**
   * @property {string} country - The profile country
   */
  country: null,

  /**
   * @property {string} state - The profile state
   */
  state: null,

  /**
   * @property {string} school - The profile school
   */
  school: null,

  /**
   * @property {string} schoolDistrict - The profile school district
   */
  schoolDistrict: null,

  /**
   * @property {string} aboutMe - The profile biography
   */
  aboutMe: null,

  /**
   * @property {string} avatarUrl - The avatar image url
   */
  avatarUrl: null,

  /**
   * @property {string} displayName - The firstName and lastName
   */
  displayName: Ember.computed('firstName', 'lastName', function () {
    return this.get('firstName') + ' ' + this.get('lastName');
  }),

  /**
   * @property {object} network - The network information object
   */
  network: null

});
