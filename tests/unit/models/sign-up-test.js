import { moduleForModel, test } from 'ember-qunit';

moduleForModel('sign-up', 'Unit | Model | sign up');

test('sign up model content', function(assert) {
  var signUp = this.subject({
    username: "jefberpe",
    firstName: "Jeffrey",
    lastName: "Bermudez",
    email: "myemail@test.com",
    organizationCode: "gooru",
    gender: "male",
    dateOfBirth: "01/01/2015",
    role: "student",
    password: "abc123",
    confirmedPassword: "abc123"
  });

  assert.equal(signUp.get("username"), "jefberpe");
  assert.equal(signUp.get("firstName"), "Jeffrey");
  assert.equal(signUp.get("lastName"), "Bermudez");
  assert.equal(signUp.get("email"), "myemail@test.com");
  assert.equal(signUp.get("organizationCode"), "gooru");
  assert.equal(signUp.get("gender"), "male");
  assert.equal(signUp.get("dateOfBirth"), "01/01/2015");
  assert.equal(signUp.get("role"), "student");
  assert.equal(signUp.get("password"), "abc123");
  assert.equal(signUp.get("confirmedPassword"), "abc123");

});

