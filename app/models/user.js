import DS from "ember-data";

export default DS.Model.extend({

  // Values used to capture and to read data to/from SignUp end-point
  firstName: DS.attr("string"),
  lastName: DS.attr("string"),
  username: DS.attr("string"),
  email: DS.attr("string"),
  organization: DS.attr("string"),

  // Values only used to read data from SignUp end-point
  gooruUId: DS.attr("string"),
  usernameDisplay: DS.attr("string"),
  profileImageUrl: DS.attr("string"),
  userRoleSetString: DS.attr("string"),
  accountCreatedType: DS.attr("string"),
  accountTypeId: DS.attr("number"),
  active: DS.attr("number"),
  confirmStatus: DS.attr("number"),
  createdOn: DS.attr("string"),
  partyUid: DS.attr("string"),
  viewFlag: DS.attr("number"),

  // Values only used to capture data to be sent to SignUp end-point
  gender: DS.attr("string"),
  dateOfBirth: DS.attr("string"),
  password: DS.attr("string"),
  role: DS.attr("string"),

  metadata: DS.belongsTo("meta", { async: true })

});
