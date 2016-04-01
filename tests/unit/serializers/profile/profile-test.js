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
    gender: null,
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
    gender: 'male',
    grade: [],
    'birth_date': '01/01/2000',
    'user_category': 'role',
    'created_at': '01/01/2000',
    'updated_at': '01/01/2000',
    'country_id': '',
    country: 'country',
    'state_id': '',
    state: 'state',
    'school_id': '',
    school: 'school',
    'school_district_id': '',
    'school_district': 'school-district',
    'about_me': 'about-me',
    'thumbnail_path': 'thumbnail.png',
    'roster_id': '',
    followers: 2,
    followings: 3,
    isFollowing: false
  };
  const expected = ProfileModel.create({
    id: 'id',
    firstName: 'first-name',
    lastName: 'last-name',
    username: 'username',
    email: 'email',
    gender: 'male',
    grades: [],
    dateOfBirth: '01/01/2000',
    role: 'role',
    createdAt: '01/01/2000',
    lastUpdate: '01/01/2000',
    countryId: '',
    country: 'country',
    stateId: '',
    state: 'state',
    schoolId:'',
    school:'school',
    schoolDistrictId: '',
    schoolDistrict: 'school-district',
    aboutMe: 'about-me',
    avatarUrl: 'thumbnail.png',
    rosterId: '',
    followers: 2,
    followings: 3,
    isFollowing: false
  });
  const normalizedProfile = serializer.normalizeReadProfile(profilePayload);
  assert.deepEqual(expected, normalizedProfile, 'Wrong normalized response');
});
