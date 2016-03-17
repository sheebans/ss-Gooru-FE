import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('serializer:profile/profile', 'Unit | Serializer | profile/profile');

test('serializeCreateProfile', function(assert) {
  const serializer = this.subject();
  const profileObject = Ember.Object.create({
    firstName: 'first-name',
    lastName: 'last-name',
    username: 'username',
    email: 'email',
    password: 'password',
    dateOfBirth: '01/01/2000',
    role: 'role'
  });
  const expected = {
    firstname: 'first-name',
    lastname: 'last-name',
    username: 'username',
    'email_id': 'email',
    password: 'password',
    'birth_date': '01/01/2000',
    'user_category': 'role',
    gender: 'male',
    grade: []
  };
  const response = serializer.serializeCreateProfile(profileObject);
  assert.deepEqual(expected, response, 'Wrong normalized response');
});
