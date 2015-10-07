//@ TODO This model will be replaced by models/user

import DS from "ember-data";

export default DS.Model.extend({

  firstName: DS.attr("string"),
  lastName: DS.attr("string"),
  username: DS.attr("string"),
  email: DS.attr("string"),
  organizationCode: DS.attr("string"),
  gender: DS.attr("string"),
  dateOfBirth: DS.attr("string"),
  role: DS.attr("string"),
  password: DS.attr("string"),
  confirmedPassword: DS.attr("string")

});
