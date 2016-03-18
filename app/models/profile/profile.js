import Ember from 'ember';

/**
 * Profile model with the user account information
 *
 * @typedef {Object} ProfileModel
 */
export default Ember.Object.extend({

  id: null,

  firstName: null,

  lastName: null,

  username: null,

  email: null,

  grades: [],

  dateOfBirth: null,

  role: null,

  lastUpdate: null,

  country: null,

  school: null,

  schoolDistrict: null,

  state: null,

  aboutMe: null

});
