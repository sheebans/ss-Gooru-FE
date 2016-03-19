import Ember from 'ember';

/**
 * Serializer to support the Profile CRUD operations in the API 3.0
 *
 * @typedef {Object} ProfileSerializer
 */
export default Ember.Object.extend({

  /**
   * Serialize a Profile object into a JSON representation required by the Profile endpoint
   * @param profileData the profile object
   * @returns {Object} returns a JSON Object
   */
  serializeCreateProfile: function(profileData) {
    return {
      firstname: profileData.get('firstName'),
      lastname: profileData.get('lastName'),
      username: profileData.get('username'),
      'email_id': profileData.get('email'),
      password: profileData.get('password'),
      'birth_date': profileData.get('dateOfBirth'),
      'user_category': profileData.get('role'),
      gender: 'male',
      grade: []
    };
  },

  // TODO This method will be implemented later
  normalizeCreateProfile: function(payload) {
    // This is a temporal response implementation
    return { payload: payload};
  }

});

