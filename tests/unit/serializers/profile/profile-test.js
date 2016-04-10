import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import ProfileModel from 'gooru-web/models/profile/profile';
import Env from 'gooru-web/config/environment';

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


test('normalizeCreateProfile', function(assert) {
  const serializer = this.subject();
  const profilePayload = {
      "user_id": "user_id",
      "username": "username",
      "access_token": "access_token"
    }
    ;
  const expected = {
    token: Env['API-3.0']['user-token-api-2.0'],
    'token-api3': "access_token",
    user: {
      username: "username",
      gooruUId: "user_id"
    },
    isAnonymous: false
  };
  const normalizedProfile = serializer.normalizeCreateProfile(profilePayload);
  assert.deepEqual(expected, normalizedProfile, 'Wrong normalized response');
});

test('normalizeOwners', function(assert) {
  const serializer = this.subject();
  const ownersData = [
    {
    "id": "f8179782-c5e1-4c0f-85e5-7db5ff6b0c8d",
    "firstname": "Sachin",
    "lastname": "Zope",
    "thumbnail_path": "any"
    },
    {
    "id": "2",
    "firstname": "Javier",
    "lastname": "Perez",
    "thumbnail_path": "none"
    }
  ];

  const owners = serializer.normalizeOwners(ownersData);
  assert.equal(owners.length, 2, 'Wrong owners length');
});


test('normalizeOwner', function(assert) {
  const serializer = this.subject();
  const ownerData = {
    "id": "f8179782-c5e1-4c0f-85e5-7db5ff6b0c8d",
    "firstname": "Sachin",
    "lastname": "Zope",
    "thumbnail_path": "any"
  };

  const owner = serializer.normalizeOwner(ownerData);
  assert.equal(owner.get("id"), 'f8179782-c5e1-4c0f-85e5-7db5ff6b0c8d', 'Wrong id');
  assert.equal(owner.get("firstName"), 'Sachin', 'Wrong first name');
  assert.equal(owner.get("lastName"), 'Zope', 'Wrong last name');
  assert.equal(owner.get("avatarUrl"), 'any', 'Wrong avatar url');
});


test('normalizeResource', function(assert) {
  const serializer = this.subject();
  const owners = [Ember.Object.create({
    "id": "f8179782-c5e1-4c0f-85e5-7db5ff6b0c8d",
    "firstname": "Sachin",
    "lastname": "Zope",
    "thumbnail_path": "any"
  })];

  const resourceData = {
    "id": "f59eff43-767d-4910-af5a-b7dc9a5ce065",
    "title": "Introduction to Java",
    "description": "Some description",
    "publish_status": "unpublished",
    "content_subformat": "webpage_resource",
    "creator_id": "f8179782-c5e1-4c0f-85e5-7db5ff6b0c8d"
  };

  const resource = serializer.normalizeResource(resourceData, owners);
  assert.equal(resource.get("id"), 'f59eff43-767d-4910-af5a-b7dc9a5ce065', 'Wrong id');
  assert.equal(resource.get("title"), 'Introduction to Java', 'Wrong title');
  assert.equal(resource.get("description"), 'Some description', 'Wrong title');
  assert.equal(resource.get("publishStatus"), 'unpublished', 'Wrong title');
  assert.equal(resource.get("format"), 'webpage', 'Wrong title');
  assert.equal(resource.get("owner.id"), "f8179782-c5e1-4c0f-85e5-7db5ff6b0c8d", 'Wrong owner id');
});


test('normalizeReadResources', function(assert) {
  const serializer = this.subject();
  const payload = {
    resources: [
      {
        "id": "f59eff43-767d-4910-af5a-b7dc9a5ce065",
        "title": "Introduction to Java",
        "description": "Some description",
        "publish_status": "unpublished",
        "content_subformat": "webpage_resource",
        "creator_id": "f8179782-c5e1-4c0f-85e5-7db5ff6b0c8d"
      },
      {
        "id": "2",
        "title": "Introduction to C#",
        "description": "Some description",
        "publish_status": "published",
        "content_subformat": "webpage_resource",
        "creator_id": "2"
      }
    ],
    owner_details: [
      {
        "id": "f8179782-c5e1-4c0f-85e5-7db5ff6b0c8d",
        "firstname": "Sachin",
        "lastname": "Zope",
        "thumbnail_path": "any"
      }
    ]
  };

  const resources = serializer.normalizeReadResources(payload);
  assert.equal(resources.length, 2, 'Wrong total resources');
  assert.equal(resources[0].get("owner.id"), "f8179782-c5e1-4c0f-85e5-7db5ff6b0c8d", 'Invalid owner id for resource 1');
  assert.ok(!resources[1].get("owner"), 'Second resource should not have an owner');
});


