import Ember from 'ember';
import ProfileModel from 'gooru-web/models/profile/profile';

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

  serializeUpdateProfile: function(profile) {
    return {
      firstname: profile.get('firstName'),
      lastname: profile.get('lastName'),
      'user_category': profile.get('role'),
      grade: profile.get('grades'),
      country: profile.get('country'),
      state: profile.get('state'),
      school: profile.get('school'),
      'school_district': profile.get('schoolDistrict'),
      'about_me': profile.get('aboutMe')
    };
  },

  // TODO This method will be implemented later
  normalizeCreateProfile: function(payload) {
    // This is a temporal response implementation
    return { payload: payload};
  },

  normalizeReadProfile: function(payload) {
    return ProfileModel.create({
      id: payload.id,
      firstName: payload.firstname,
      lastName: payload.lastname,
      username: payload.username,
      email: payload['email_id'],
      grades: payload.grade,
      dateOfBirth: payload['birth_date'],
      role: payload['user_category'],
      lastUpdate: payload['updated_at'],
      country: payload.country,
      state: payload.state,
      school: payload.school,
      schoolDistrict: payload['school_district'],
      aboutMe: payload['about_me']
    });
  }

});
