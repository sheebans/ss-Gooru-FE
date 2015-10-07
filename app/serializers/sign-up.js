import DS from "ember-data";

export default DS.JSONAPISerializer.extend({

  serialize: function(snapshot) {
    var signUpObject = snapshot.record.toJSON();
    var data = {
      user : {
        firstName: signUpObject.firstName,
        lastName: signUpObject.lastName,
        username: signUpObject.username,
        emailId: signUpObject.email,
        organization: {
          organizationCode: "gooru"
        }
      },
      gender: "male",
      dateOfBirth: signUpObject.dateOfBirth,
      role: signUpObject.role,
      password : signUpObject.password
    };

    return data;
  },

  normalizeSingleResponse: function(store, primaryModelClass, payload) {
    var userModel =  {
      data: {
        id: payload.gooruUId,
        type: "user",
        attributes: {
          accountCreatedType: payload.accountCreatedType,
          accountTypeId: payload.accountTypeId,
          active: payload.active,
          confirmStatus: payload.confirmStatus,
          createdOn: payload.createdOn,
          email: payload.emailId,
          firstName: payload.firstName,
          gooruUId: payload.gooruUId,
          lastName: payload.lastName,
          organizationName: payload.organizationName,
          partyUid: payload.partyUid,
          profileImageUrl: payload.profileImageUrl,
          userRoleSetString: payload.userRoleSetString,
          username: payload.username,
          usernameDisplay: payload.usernameDisplay,
          viewFlag: payload.viewFlag
        }
      }
    };
    store.push(userModel);

    return userModel;
  }

});
