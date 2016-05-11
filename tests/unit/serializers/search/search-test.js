import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';



moduleFor('serializer:search/search', 'Unit | Serializer | search/search');

test('normalizeCollection', function(assert) {
  const serializer = this.subject();
  serializer.set('session', Ember.Object.create({
    'cdnUrls': {
      content: '//basepath/'
    }
  }));

  const collectionData = {
    "id": "d9616037-9fc8-4641-8d32-99fb956406d3",
    "profileUserVisibility": true,
    "questionCount": "3",
    "resourceCount": "5",
    "languageObjective": "In this collection",
    "scollectionRemixCount": 2,
    "title": "Cell Growth and Division",
    "type": "collection",
    "userFirstName": "Chad",
    "userLastName": "Barris",
    "userProfileImage": "profile.png",
    "usernameDisplay": "username",
    "thumbnail": "collection.png"
  };

  const collection = serializer.normalizeCollection(collectionData);
  assert.equal(collection.get("id"), 'd9616037-9fc8-4641-8d32-99fb956406d3', 'Wrong id');
  assert.equal(collection.get("title"), 'Cell Growth and Division', 'Wrong title');
  // TODO assert.equal(collection.get("publishStatus"), 'published', 'Wrong publish status');
  assert.equal(collection.get("thumbnailUrl"), '//basepath/collection.png', 'Wrong image');
  // TODO assert.equal(collection.get("course"), 'mathematics course 101', 'Wrong course name');
  assert.equal(collection.get("isVisibleOnProfile"), true, 'Wrong visible on profile');
  assert.equal(collection.get("learningObjectives"), "In this collection", 'Wrong learning objective');
  assert.equal(collection.get("resourceCount"), 5, 'Wrong resource count');
  assert.equal(collection.get("questionCount"), 3, 'Wrong question count');
  assert.equal(collection.get("remixCount"), 2, 'Wrong remix count');
  // TODO assert.deepEqual(collection.get("standards")[0].get("code"), "K12.MA", 'Wrong standards');
  assert.equal(collection.get("owner.id"), 12, 'Wrong owner id');
  assert.equal(collection.get("owner.firstName"), "Chad", 'Wrong owner first name');
  assert.equal(collection.get("owner.lastName"), "Barris", 'Wrong owner last name');
  assert.equal(collection.get("owner.avatarUrl"), '//basepath/profile.png', 'Wrong owner avatar');
  assert.equal(collection.get("owner.username"), 'username', 'Wrong owner username');

});

test('normalizeAssessment', function(assert) {
  const serializer = this.subject();
  serializer.set('session', Ember.Object.create({
    'cdnUrls': {
      content: '//basepath/'
    }
  }));

  const assessmentData = {
    "id": "d9616037-9fc8-4641-8d32-99fb956406d3",
    "profileUserVisibility": true,
    "questionCount": "3",
    "resourceCount": "5",
    "languageObjective": "In this assessment",
    "scollectionRemixCount": 2,
    "title": "Cell Growth and Division",
    "type": "assessment",
    "userFirstName": "Chad",
    "userLastName": "Barris",
    "userProfileImage": "profile.png",
    "usernameDisplay": "username",
    "userId": 12,
    "thumbnail": "assessment.png"
  };

  const assessment = serializer.normalizeAssessment(assessmentData);
  assert.equal(assessment.get("id"), 'd9616037-9fc8-4641-8d32-99fb956406d3', 'Wrong id');
  assert.equal(assessment.get("title"), 'Cell Growth and Division', 'Wrong title');
  // TODO assert.equal(collection.get("publishStatus"), 'published', 'Wrong publish status');
  assert.equal(assessment.get("thumbnailUrl"), '//basepath/assessment.png', 'Wrong image');
  // TODO assert.equal(collection.get("course"), 'mathematics course 101', 'Wrong course name');
  assert.equal(assessment.get("isVisibleOnProfile"), true, 'Wrong visible on profile');
  assert.equal(assessment.get("learningObjectives"), "In this assessment", 'Wrong learning objective');
  assert.equal(assessment.get("resourceCount"), 5, 'Wrong resource count');
  assert.equal(assessment.get("questionCount"), 3, 'Wrong question count');
  assert.equal(assessment.get("remixCount"), 2, 'Wrong remix count');
  // TODO assert.deepEqual(collection.get("standards")[0].get("code"), "K12.MA", 'Wrong standards');
  assert.equal(assessment.get("owner.id"), 12, 'Wrong owner id');
  assert.equal(assessment.get("owner.firstName"), "Chad", 'Wrong owner first name');
  assert.equal(assessment.get("owner.lastName"), "Barris", 'Wrong owner last name');
  assert.equal(assessment.get("owner.avatarUrl"), '//basepath/profile.png', 'Wrong owner avatar');
  assert.equal(assessment.get("owner.username"), 'username', 'Wrong owner username');

});

test('normalizeSearchResources', function(assert) {
  const serializer = this.subject();
  const resourcesPayload = {
    "searchResults": [
      {
        "description": "7th Grade Cells unit",
        "gooruOid": "415c37da-4727-11e5-8333-22000ac41a3c",
        "contentSubFormat":  "text_resource",
        "resourceType": {
          "name": "text_resource"
        },
        "title": "Cells Unit",
        "url": "https://docs.google.com/file/d/0B9aKdxaTnscydmJGa2pXbEx6Wmc",
        "user": {
          "emailId": "",
          "firstName": "goorutfa",
          "gooruUId": "9eb1a416-c225-4a01-9ec3-5371b2274ccb",
          "lastName": "tfagooru",
          "partyUid": "9eb1a416-c225-4a01-9ec3-5371b2274ccb"
        }
      },
      {
        "description": "7th Grade Cells unit",
        "gooruOid": "415c37da-4727-11e5-8333-22000ac41a3c",
        "contentSubFormat":  "text_resource",
        "resourceType": {
          "name": "text_resource"
        },
        "title": "Cells Unit",
        "url": "https://docs.google.com/file/d/0B9aKdxaTnscydmJGa2pXbEx6Wmc",
        "user": {
          "emailId": "",
          "firstName": "goorutfa",
          "gooruUId": "9eb1a416-c225-4a01-9ec3-5371b2274ccb",
          "lastName": "tfagooru",
          "partyUid": "9eb1a416-c225-4a01-9ec3-5371b2274ccb"
        }
      }
    ]
  };

  const resources = serializer.normalizeSearchResources(resourcesPayload);
  assert.equal(resources.length, 2, 'Wrong resources length');
  assert.equal(resources[0].get("format"), "text", 'Wrong format for resource 1');


});

test('normalizeSearchQuestions', function(assert) {
  const serializer = this.subject();
  const resourcesPayload = {
    "searchResults": [
      {
        "description": "Cells are organized into _______?",
        "gooruOid": "d6bc690a-ff0b-4c38-b2be-41c35d3ba3d7",
        "resourceFormat": {
          "value": "question"
        },
        "resourceType": {
          "name": "question"
        },
        "thumbnail": "f000/2628/3363/6397.svg",
        "title": "Cells are organized",
        "typeName": "multiple_choice_question",
        "user": {
          "firstName": "Rocky",
          "gooruUId": "ee410cef-2a44-46ef-878d-172511e54e07",
          "lastName": "Shore"
        }
      }
    ]
  };

  const resources = serializer.normalizeSearchQuestions(resourcesPayload);
  assert.equal(resources.length, 1, 'Wrong resources length');
  assert.equal(resources[0].get("format"), "question", 'Wrong format for resource 1');
});

test('normalizeQuestion', function(assert) {
  const serializer = this.subject();

  const questionData = {
    "description": "Cells are organized into _______?",
    "gooruOid": "d6bc690a-ff0b-4c38-b2be-41c35d3ba3d7",
    "resourceFormat": {
      "value": "question"
    },
    "resourceType": {
      "name": "question"
    },
    "thumbnail": "f000/2628/3363/6397.svg",
    "title": "Cells are organized",
    "typeName": "multiple_choice_question",
    "user": {
      "firstName": "Rocky",
      "gooruUId": "ee410cef-2a44-46ef-878d-172511e54e07",
      "lastName": "Shore"
    }
  };

  const question = serializer.normalizeQuestion(questionData);
  assert.equal(question.get("id"), 'd6bc690a-ff0b-4c38-b2be-41c35d3ba3d7', 'Wrong id');
  assert.equal(question.get("title"), 'Cells are organized', 'Wrong title');
  assert.equal(question.get("description"), 'Cells are organized into _______?', 'Wrong description');
  //TODO assert.equal(question.get("publishStatus"), 'unpublished', 'Wrong publish status');
  assert.equal(question.get("format"), 'question', 'Wrong format');
  assert.equal(question.get("thumbnailUrl"), 'f000/2628/3363/6397.svg', 'Wrong thumbnailUrl');
  assert.equal(question.get("type"), 'MC', 'Wrong type');
  assert.equal(question.get("owner.id"), "ee410cef-2a44-46ef-878d-172511e54e07", 'Wrong owner id');
  //TODO assert.equal(question.get("standards"), 'unpublished', 'Wrong publish status');
});

test('normalizeResource', function(assert) {
  const serializer = this.subject();

  const resourceData = {
    "description": "7th Grade Cells unit",
    "gooruOid": "415c37da-4727-11e5-8333-22000ac41a3c",
    "contentSubFormat":  "text_resource",
    "resourceType": {
      "name": "text_resource"
    },
    "title": "Cells Unit",
    "url": "https://docs.google.com/file/d/0B9aKdxaTnscydmJGa2pXbEx6Wmc",
    "user": {
      "emailId": "",
      "firstName": "goorutfa",
      "gooruUId": "9eb1a416-c225-4a01-9ec3-5371b2274ccb",
      "lastName": "tfagooru",
      "partyUid": "9eb1a416-c225-4a01-9ec3-5371b2274ccb"
    }
  };

  const resource = serializer.normalizeResource(resourceData);
  assert.equal(resource.get("id"), '415c37da-4727-11e5-8333-22000ac41a3c', 'Wrong id');
  assert.equal(resource.get("title"), 'Cells Unit', 'Wrong title');
  assert.equal(resource.get("description"), '7th Grade Cells unit', 'Wrong description');
  assert.equal(resource.get("format"), 'text', 'Wrong format');
  //TODO assert.equal(resource.get("publisher"), 'text', 'Wrong format');
  //TODO assert.equal(question.get("thumbnailUrl"), 'f000/2628/3363/6397.svg', 'Wrong thumbnailUrl');
  //TODO assert.equal(question.get("standards"), 'unpublished', 'Wrong publish status');
  assert.equal(resource.get("url"), "https://docs.google.com/file/d/0B9aKdxaTnscydmJGa2pXbEx6Wmc", 'Wrong url');
  assert.equal(resource.get("owner.id"), "9eb1a416-c225-4a01-9ec3-5371b2274ccb", 'Wrong owner id');
});

test('normalizeOwner', function(assert) {
  const serializer = this.subject();
  const ownerData = {
    "emailId": "",
    "firstName": "goorutfa",
    "gooruUId": "9eb1a416-c225-4a01-9ec3-5371b2274ccb",
    "lastName": "tfagooru",
    "usernameDisplay": "szope",
    "profileImageUrl": "any"
  };

  const owner = serializer.normalizeOwner(ownerData);
  assert.equal(owner.get("id"), '9eb1a416-c225-4a01-9ec3-5371b2274ccb', 'Wrong id');
  assert.equal(owner.get("firstName"), 'goorutfa', 'Wrong first name');
  assert.equal(owner.get("lastName"), 'tfagooru', 'Wrong last name');
  assert.equal(owner.get("username"), 'szope', 'Wrong username');
  assert.equal(owner.get("avatarUrl"), 'any', 'Wrong avatar url');
});
