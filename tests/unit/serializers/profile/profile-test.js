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

test('normalizeStandards', function(assert) {
  const serializer = this.subject();
  const standardsData = [ "a", "b"];

  const standards = serializer.normalizeStandards(standardsData);
  assert.equal(standards.length, 2, 'Wrong standards length');
  assert.equal(standards[0].get("code"), "a", 'Wrong code');
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


test('normalizeQuestion', function(assert) {
  const serializer = this.subject();
  const owners = [Ember.Object.create({
    "id": "f8179782-c5e1-4c0f-85e5-7db5ff6b0c8d",
    "firstname": "Sachin",
    "lastname": "Zope",
    "thumbnail_path": "any"
  })];

  const questionData = {
    "id": "f59eff43-767d-4910-af5a-b7dc9a5ce065",
    "title": "Introduction to Java",
    "description": "Some description",
    "publish_status": "unpublished",
    "content_format": "question",
    "creator_id": "f8179782-c5e1-4c0f-85e5-7db5ff6b0c8d"
  };

  const question = serializer.normalizeQuestion(questionData, owners);
  assert.equal(question.get("id"), 'f59eff43-767d-4910-af5a-b7dc9a5ce065', 'Wrong id');
  assert.equal(question.get("title"), 'Introduction to Java', 'Wrong title');
  assert.equal(question.get("description"), 'Some description', 'Wrong description');
  assert.equal(question.get("publishStatus"), 'unpublished', 'Wrong publish status');
  assert.equal(question.get("format"), 'question', 'Wrong format');
  assert.equal(question.get("owner.id"), "f8179782-c5e1-4c0f-85e5-7db5ff6b0c8d", 'Wrong owner id');
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
  assert.equal(resource.get("description"), 'Some description', 'Wrong description');
  assert.equal(resource.get("publishStatus"), 'unpublished', 'Wrong publish status');
  assert.equal(resource.get("format"), 'webpage', 'Wrong format');
  assert.equal(resource.get("owner.id"), "f8179782-c5e1-4c0f-85e5-7db5ff6b0c8d", 'Wrong owner id');
});

test('normalizeCollection', function(assert) {
  const serializer = this.subject();
  const owners = [Ember.Object.create({
    "id": "852f9814-0eb4-461d-bd3b-aca9c2500595",
    "firstname": "Sachin",
    "lastname": "Zope",
    "thumbnail_path": "any"
  })];

  const collectionData = {
    "id": "50484e74-ad95-44d5-981a-c18411260233",
    "title": "oops poly basics",
    "publish_status": "published",
    "thumbnail": "collection.png",
    "taxonomy": [ "K12.MA" ],
    "visible_on_profile": false,
    "learning_objective": "This is important collection",
    "owner_id": "852f9814-0eb4-461d-bd3b-aca9c2500595",
    "course_title": "mathematics course 101",
    "resource_count": 5,
    "question_count": 3,
    "remix_count": 2
  };

  const collection = serializer.normalizeCollection(collectionData, owners);
  assert.equal(collection.get("id"), '50484e74-ad95-44d5-981a-c18411260233', 'Wrong id');
  assert.equal(collection.get("title"), 'oops poly basics', 'Wrong title');
  assert.equal(collection.get("publishStatus"), 'published', 'Wrong publish status');
  assert.equal(collection.get("image"), 'collection.png', 'Wrong image');
  assert.equal(collection.get("course"), 'mathematics course 101', 'Wrong course name');
  assert.equal(collection.get("isVisibleOnProfile"), false, 'Wrong visible on profile');
  assert.equal(collection.get("learningObjectives"), "This is important collection", 'Wrong learning objective');
  assert.equal(collection.get("resourceCount"), 5, 'Wrong resource count');
  assert.equal(collection.get("questionCount"), 3, 'Wrong question count');
  assert.equal(collection.get("remixCount"), 2, 'Wrong remix count');
  assert.deepEqual(collection.get("standards")[0].get("code"), "K12.MA", 'Wrong standards');
  assert.equal(collection.get("owner.id"), "852f9814-0eb4-461d-bd3b-aca9c2500595", 'Wrong owner id');
});

test('normalizeAssessment', function(assert) {
  const serializer = this.subject();
  const owners = [Ember.Object.create({
    "id": "852f9814-0eb4-461d-bd3b-aca9c2500595",
    "firstname": "Sachin",
    "lastname": "Zope",
    "thumbnail_path": "any"
  })];

  const assessmentData = {
    "id": "50484e74-ad95-44d5-981a-c18411260233",
    "title": "oops poly basics",
    "publish_status": "published",
    "thumbnail": "collection.png",
    "taxonomy": [ "K12.MA" ],
    "visible_on_profile": false,
    "learning_objective": "This is important collection",
    "owner_id": "852f9814-0eb4-461d-bd3b-aca9c2500595",
    "course_title": "mathematics course 101",
    "question_count": 3,
    "remix_count": 2
  };

  const collection = serializer.normalizeAssessment(assessmentData, owners);
  assert.equal(collection.get("id"), '50484e74-ad95-44d5-981a-c18411260233', 'Wrong id');
  assert.equal(collection.get("title"), 'oops poly basics', 'Wrong title');
  assert.equal(collection.get("publishStatus"), 'published', 'Wrong publish status');
  assert.equal(collection.get("image"), 'collection.png', 'Wrong image');
  assert.equal(collection.get("course"), 'mathematics course 101', 'Wrong course name');
  assert.equal(collection.get("isVisibleOnProfile"), false, 'Wrong visible on profile');
  assert.equal(collection.get("learningObjectives"), "This is important collection", 'Wrong learning objective');
  assert.equal(collection.get("questionCount"), 3, 'Wrong question count');
  assert.equal(collection.get("remixCount"), 2, 'Wrong remix count');
  assert.deepEqual(collection.get("standards")[0].get("code"), "K12.MA", 'Wrong standards');
  assert.equal(collection.get("owner.id"), "852f9814-0eb4-461d-bd3b-aca9c2500595", 'Wrong owner id');
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

test('normalizeReadQuestions', function(assert) {
  const serializer = this.subject();
  const payload = {
    questions: [
      {
        "id": "f59eff43-767d-4910-af5a-b7dc9a5ce065",
        "title": "Introduction to Java",
        "description": "Some description",
        "publish_status": "unpublished",
        "content_format": "question",
        "creator_id": "f8179782-c5e1-4c0f-85e5-7db5ff6b0c8d"
      },
      {
        "id": "2",
        "title": "Introduction to C#",
        "description": "Some description",
        "publish_status": "published",
        "content_format": "question",
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

  const questions = serializer.normalizeReadQuestions(payload);
  assert.equal(questions.length, 2, 'Wrong total questions');
  assert.equal(questions[0].get("owner.id"), "f8179782-c5e1-4c0f-85e5-7db5ff6b0c8d", 'Invalid owner id for question 1');
  assert.ok(!questions[1].get("owner"), 'Second question should not have an owner');
});

test('normalizeReadCollections', function(assert) {
  const serializer = this.subject();
  const payload = {
    collections: [
      {
        "id": "50484e74-ad95-44d5-981a-c18411260233",
        "title": "oops poly basics",
        "publish_status": "published",
        "thumbnail": "collection.png",
        "taxonomy": [ "K12.MA" ],
        "visible_on_profile": false,
        "learning_objective": "This is important collection",
        "owner_id": "852f9814-0eb4-461d-bd3b-aca9c2500595",
        "course_title": "mathematics course 101",
        "resource_count": 5,
        "question_count": 3,
        "remix_count": 2,
        "description": "Some description"
      },
      {
        "id": "2",
        "title": "oops poly basics",
        "publish_status": "published",
        "thumbnail": "collection.png",
        "taxonomy": [ "K12.MA" ],
        "visible_on_profile": false,
        "learning_objective": "This is important collection",
        "owner_id": "2",
        "course_title": "mathematics course 101",
        "resource_count": 5,
        "question_count": 3,
        "remix_count": 2,
        "description": "Some description"
      }
    ],
    owner_details: [
      {
        "id": "852f9814-0eb4-461d-bd3b-aca9c2500595",
        "firstname": "Sachin",
        "lastname": "Zope",
        "thumbnail_path": "any"
      }
    ]
  };

  const collections = serializer.normalizeReadCollections(payload);
  assert.equal(collections.length, 2, 'Wrong total collections');
  assert.equal(collections[0].get("owner.id"), "852f9814-0eb4-461d-bd3b-aca9c2500595", 'Invalid owner id for collection 1');
  assert.ok(!collections[1].get("owner"), 'Second collection should not have an owner');
});

test('normalizeReadAssessments', function(assert) {
  const serializer = this.subject();
  const payload = {
    assessments: [
      {
        "id": "50484e74-ad95-44d5-981a-c18411260233",
        "title": "oops poly basics",
        "publish_status": "published",
        "thumbnail": "collection.png",
        "taxonomy": [ "K12.MA" ],
        "visible_on_profile": false,
        "learning_objective": "This is important collection",
        "owner_id": "852f9814-0eb4-461d-bd3b-aca9c2500595",
        "course_title": "mathematics course 101",
        "question_count": 3,
        "remix_count": 2,
        "description": "Some description"
      },
      {
        "id": "2",
        "title": "oops poly basics",
        "publish_status": "published",
        "thumbnail": "collection.png",
        "taxonomy": [ "K12.MA" ],
        "visible_on_profile": false,
        "learning_objective": "This is important collection",
        "owner_id": "2",
        "course_title": "mathematics course 101",
        "question_count": 3,
        "remix_count": 2,
        "description": "Some description"
      }
    ],
    owner_details: [
      {
        "id": "852f9814-0eb4-461d-bd3b-aca9c2500595",
        "firstname": "Sachin",
        "lastname": "Zope",
        "thumbnail_path": "any"
      }
    ]
  };

  const assessments = serializer.normalizeReadAssessments(payload);
  assert.equal(assessments.length, 2, 'Wrong total assessments');
  assert.equal(assessments[0].get("owner.id"), "852f9814-0eb4-461d-bd3b-aca9c2500595", 'Invalid owner id for assessment 1');
  assert.ok(!assessments[1].get("owner"), 'Second assessment should not have an owner');
});


