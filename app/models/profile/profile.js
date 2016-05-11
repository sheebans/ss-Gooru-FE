import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  username: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Please enter a username.'
      }),
      validator('length', {
        min: 4,
        max: 20,
        message: 'Username must be between 4 and 20 characters.'
      })
    ]
  },

  usernameAsync: {
    validators: [
      validator('username')
    ]
  },

  firstName: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Please enter your first name.'
      }),
      validator('length', {
        min: 2,
        message: 'First name must have at least 2 letters.'
      }),
      validator('format', {
        regex: /^[a-zA-Z- ]+$/,
        message: "Please enter only letters."
      })
    ]
  },

  lastName: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Please enter your last name.'
      }),
      validator('length', {
        min: 2,
        message: 'Last name must have at least 2 letters.'
      }),
      validator('format', {
        regex: /^[a-zA-Z- ]+$/,
        message: "Please enter only letters."
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
    }),
    validator('length', {
      min: 5,
      max: 14,
      message: "Password must be between 5 and 14 characters."
    }),
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
      regex: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      message: 'Please enter a valid email address.'
    })
  ],

  emailAsync: {
    validators: [
      validator('email')
    ]
  }

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
   * @property {string} code - The profile code
   * //TODO this should come from BE
   */
  code: Ember.computed("username", function(){
    const username = this.get("username");
    if (username) {
      return username;
    }
    else {
      const uuid = this.get("id").split("-");
      return uuid.length >= 3 ? uuid[3] : uuid;
    }
  }),

  /**
   * @property {string} usernameAsync - Used to validate on submit
   */
  usernameAsync: null,

  /**
   * @property {string} password  - The profile password
   */
  password: null,

  /**
   * @property {string} email - The profile email
   */
  email: null,

  /**
   * @property {string} emailAsync - Used to validate on submit
   */
  emailAsync: null,

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
   * @property {string} displayName
   */
  displayName: Ember.computed('username', 'fullName', function () {
    return this.get("username") ? this.get("username") : this.get("fullName");
  }),

  /**
   * @property {string}
   */
  fullName: Ember.computed("firstName", "lastName", function(){
    const firstName = this.get("firstName");
    const lastName = this.get("lastName");
    return `${firstName} ${lastName}`;
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
  network: null,

  /**
   * Return a copy of the collection
   *
   * @function
   * @return {Profile}
   */
  copy: function () {

    var properties = [];
    var enumerableKeys = Object.keys(this);

    for (let i = 0; i < enumerableKeys.length; i++) {
      let key = enumerableKeys[i];
      let value = Ember.typeOf(this.get(key));
      if (value === 'string' || value === 'number' || value === 'boolean') {
        properties.push(key);
      }
    }

    properties = this.getProperties(properties);

    return this.get('constructor').create(Ember.getOwner(this).ownerInjection(), properties);
  },

  /**
   * Copy a list of property values from another model to override the current ones
   *
   * @function
   * @param {Collection|Assessment} model
   * @param {String[]} propertyList
   * @return {null}
   */
  merge: function(model, propertyList = []) {
    var properties = model.getProperties(propertyList);
    console.log('properties', properties);
    this.setProperties(properties);
  }

});
