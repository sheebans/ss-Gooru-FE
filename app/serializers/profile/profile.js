import Ember from 'ember';

export default Ember.Object.extend({

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

