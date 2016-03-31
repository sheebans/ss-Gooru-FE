import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import ProfileModel from 'gooru-web/models/profile/profile';

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
  assert.deepEqual(expected, response, 'Wrong serialized response');
});


test('serializeUpdateProfile', function(assert) {
  const serializer = this.subject();
  const profile = ProfileModel.create({
    firstName: 'first-name',
    lastName: 'last-name',
    role: 'role',
    grades: [],
    country: 'country',
    state: 'state',
    school: 'school',
    schoolDistrict: 'school-district',
    aboutMe: 'about-me'
  });
  const expected = {
    firstname: 'first-name',
    lastname: 'last-name',
    'user_category': 'role',
    grade: [],
    country: 'country',
    state: 'state',
    school: 'school',
    'school_district': 'school-district',
    'about_me': 'about-me'
  };
  const response = serializer.serializeUpdateProfile(profile);
  assert.deepEqual(expected, response, 'Wrong serialized response');
});

test('normalizeReadProfile', function(assert) {
  const serializer = this.subject();
  const profilePayload = {
    id: 'id',
    firstname: 'first-name',
    lastname: 'last-name',
    username: 'username',
    'email_id': 'email',
    grade: [],
    'birth_date': '01/01/2000',
    'user_category': 'role',
    'updated_at': '01/01/2000',
    country: 'country',
    state: 'state',
    school: 'school',
    'school_district': 'school-district',
    'about_me': 'about-me'
  };
  const expected = ProfileModel.create({
    id: 'id',
    firstName: 'first-name',
    lastName: 'last-name',
    username: 'username',
    email: 'email',
    grades: [],
    dateOfBirth: '01/01/2000',
    role: 'role',
    lastUpdate: '01/01/2000',
    country: 'country',
    state: 'state',
    school:'school',
    schoolDistrict: 'school-district',
    aboutMe: 'about-me'
  });
  const normalizedProfile = serializer.normalizeReadProfile(profilePayload);
  assert.deepEqual(expected, normalizedProfile, 'Wrong normalized response');
});
