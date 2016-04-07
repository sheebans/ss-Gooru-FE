import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  username: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Please enter a username.'
      }),
      validator('username')
    ]
  },

  firstName: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Please enter a first name.'
      }),
      validator('length', {
        min: 2,
        message: 'First name must have at least two letters.'
      })
    ]
  },

  lastName: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Please enter a last name.'
      }),
      validator('length', {
        min: 2,
        message: 'Last name must have at least two letters.'
      })
    ]
  },

  password: [
    validator('presence', {
      presence: true,
      message: 'Please enter a password.'
    }),
    validator('format', {
      regex: /^\w+$/,
      message: "Please don't use special characters."
    })
  ],

  rePassword:[
    validator('presence', {
      presence: true,
      message: 'Please confirm your password.'
    }),
    validator('format', {
      regex: /^\w+$/,
      message: "Please don't use special characters."
    }),
    validator(function(value,options,model/* ,attribute*/) {
      return value !== model.get('password') ? `Passwords do not match.` : true ;
    })
  ],

  email: [
    validator('format', {
      type: 'email',
      message: 'Please enter a valid email address.'
    }),
    validator('email')
  ]

});

/**
 * Profile model with the user account information
 *
 * @typedef {Object} ProfileModel
 */
export default Ember.Object.extend(Validations,{

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
   * @property {string} password  - The profile password
   */
  password: null,

  /**
   * @property {string} email - The profile email
   */
  email: null,

  /**
   * @property {string} gender - Profile gender
   */
  gender: null,

  /**
   * @property {string[]} grades - An arrays of string with the grades of the profile
   */
  grades: [],

  /**
   * @property {date} dateOfBirth - The profile date of birth
   */
  dateOfBirth: null,

  /**
   * @property {date} dayOfBirth - The profile day of birth
   */
  dayOfBirth: null,

  /**
   * @property {date} monthOfBirth - The profile month of birth
   */
  monthOfBirth: null,

  /**
   * @property {date} yearOfBirth - The profile year of birth
   */
  yearOfBirth: null,

  /**
   * @property {string} role - The profile role (teacher, student, etc)
   */
  role: null,

  /**
   * @property {date} createdAt - The profile creation date
   */
  createdAt: null,

  /**
   * @property {date} lastUpdate - The last profile modification date
   */
  lastUpdate: null,

  /**
   * @property {string} countryId - The profile country id
   */
  countryId: null,

  /**
   * @property {string} country - The profile country
   */
  country: null,

  /**
   * @property {string} stateId - The profile state id
   */
  stateId: null,

  /**
   * @property {string} state - The profile state
   */
  state: null,

  /**
   * @property {string} schoolId - The profile school id
   */
  schoolId: null,

  /**
   * @property {string} school - The profile school
   */
  school: null,

  /**
   * @property {string} schoolDistrictId - The profile school district id
   */
  schoolDistrictId: null,

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
   * @property {string} rosterId - Profile roster id
   */
  rosterId: null,

  /**
   * @property {string} displayName - The firstName and lastName
   */
  displayName: Ember.computed('firstName', 'lastName', function () {
    return this.get('firstName') + ' ' + this.get('lastName');
  }),

  /**
   * @property {number} followers - The followers count of the profile
   */
  followers: 0,

  /**
   * @property {number} followings - The followings count of the profile
   */
  followings: 0,

  /**
   * @property {boolean} isFollowing - Indicates if current user is following the profile
   */
  isFollowing: false,

  /**
   * @property {object} network - The network information object
   */
  network: null

});
