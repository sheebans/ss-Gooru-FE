import { moduleForModel, test } from 'ember-qunit';
import Pretender from 'pretender';

const RESPONSE = {
  "accountCreatedType": "normal",
  "accountTypeId": 3,
  "active": 1,
  "confirmStatus": 0,
  "createdOn": "MonDec0106:25:15UTC2014",
  "emailId": "sdffsgf@gmail.com",
  "firstName": "developer",
  "gooruUId": "006449b7-fd9a-457b-99b0-98e2cacf1536",
  "lastName": "team",
  "organizationName": "Gooru",
  "partyUid": "006449b7-fd9a-457b-99b0-98e2cacf1536",
  "profileImageUrl": "http://profile-demo.s3.amazonaws.com/profile-prod/006449b7-fd9a-457b-99b0-98e2cacf1536.png",
  "userRoleSetString": "User",
  "username": "developer2",
  "usernameDisplay": "developer2",
  "viewFlag": 0
};
var server;

moduleForModel('user/user', 'Unit | Serializer | user/user', {
  needs: ['serializer:user/user'],

  beforeEach() {
    server = new Pretender(function() {
      this.get('/user/users', function() {
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify(RESPONSE)];
      });
    });
  },

  afterEach() {
    server.shutdown();
  }
});

test('it normalizes queryRecord response for user', function(assert) {
  return this.store().queryRecord('user/user', {

  }).then((users) => {
    assert.ok(users);
    //assert.equal(users.get('length'), 1, 'length is not one '+users.get('length'));
    var userItem = users.objectAt(0);
    assert.equal(userItem.get('id'), '006449b7-fd9a-457b-99b0-98e2cacf1536', 'Wrong id');
    assert.equal(userItem.get('accountCreatedType'), 'normal', 'wrong accountCreatedType');
    assert.equal(userItem.get('accountTypeId'), '3', 'wrong accountTypeId');
    assert.equal(userItem.get('active'), '1', 'wrong active');
    assert.equal(userItem.get('confirmStatus'), '0', 'wrong confirmStatus');
    assert.equal(userItem.get('createdOn'), 'MonDec0106:25:15UTC2014', 'wrong createdOn');
    assert.equal(userItem.get('email'), 'sdffsgf@gmail.com', 'wrong email');
    assert.equal(userItem.get('firstName'), 'developer', 'wrong first name');
    assert.equal(userItem.get('gooruUId'), '006449b7-fd9a-457b-99b0-98e2cacf1536', 'wrong gooruUId');
    assert.equal(userItem.get('lastName'), 'team', 'wrong lastName');
    assert.equal(userItem.get('organizationName'), 'Gooru', 'wrong forganizationName');
    assert.equal(userItem.get('partyUid'), '006449b7-fd9a-457b-99b0-98e2cacf1536', 'wrong partyUid');
    assert.equal(userItem.get('profileImageUrl'), 'http://profile-demo.s3.amazonaws.com/profile-prod/006449b7-fd9a-457b-99b0-98e2cacf1536.png', 'wrong profileImageUrl');
    assert.equal(userItem.get('userRoleSetString'), 'User', 'wrong userRoleSetString');
    assert.equal(userItem.get('username'), 'developer2', 'username');
    assert.equal(userItem.get('usernameDisplay'), 'developer2', 'wrong usernameDisplay');
    assert.equal(userItem.get('viewFlag'), '0', 'wrong viewFlag');
  });
});
