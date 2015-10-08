import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user', 'Unit | Model | user');

test('user model content', function(assert) {
  var user = this.subject({
    username: "jefberpe",
    firstName: "Jeffrey",
    lastName: "Bermudez",
    email: "myemail@test.com",
    organizationCode: "gooru",

    gender: "male",
    dateOfBirth: "01/01/2015",
    role: "student",
    password: "abc123",

    gooruUId: "123abc",
    usernameDisplay: "Jeffrey Bermudez",
    profileImageUrl: "http://image.url.com/profile_image.png",
    userRoleSetString: "student,teacher",
    accountCreatedType: "account_type",
    accountTypeId: 1,
    active: 1,
    confirmStatus: 1,
    createdOn: "01/01/2015",
    partyUid: "123abc",
    viewFlag: 1
  });

  assert.equal(user.get("username"), "jefberpe");
  assert.equal(user.get("firstName"), "Jeffrey");
  assert.equal(user.get("lastName"), "Bermudez");
  assert.equal(user.get("email"), "myemail@test.com");
  assert.equal(user.get("organizationCode"), "gooru");
  assert.equal(user.get("gender"), "male");
  assert.equal(user.get("dateOfBirth"), "01/01/2015");
  assert.equal(user.get("role"), "student");
  assert.equal(user.get("password"), "abc123");
  assert.equal(user.get("gooruUId"), "123abc");

  assert.equal(user.get("gooruUId"), "123abc");
  assert.equal(user.get("usernameDisplay"), "Jeffrey Bermudez");
  assert.equal(user.get("profileImageUrl"), "http://image.url.com/profile_image.png");
  assert.equal(user.get("userRoleSetString"), "student,teacher");
  assert.equal(user.get("accountCreatedType"), "account_type");
  assert.equal(user.get("accountTypeId"), 1);
  assert.equal(user.get("active"), 1);
  assert.equal(user.get("confirmStatus"), 1);
  assert.equal(user.get("partyUid"), "123abc");
  assert.equal(user.get("viewFlag"), 1);

});



