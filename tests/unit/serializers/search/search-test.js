import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import SearchCollectionModel from 'gooru-web/models/search/collection';


moduleFor('serializer:search/search', 'Unit | Serializer | search/search');

test('normalizeSearchCollections', function(assert) {
  const serializer = this.subject();
  const collectionsPayload = {
    "executionTime": 1710,
    "query": {
      "userQueryString": "india",
      "rewrittenQueryString": "india"
    },
    "resultCount": 1,
    "searchCount": 0,
    "searchResults": [
      {
        "addDate": "2014-05-24T01:13:23.000Z",
        "assetURI": "http://qacdn.gooru.org/qalive/",
        "category": "noQuestion",
        "collaboratorCount": 0,
        "collaborators": "",
        "collectionItemCount": 4,
        "collectionItems": [],
        "collectionType": "collection",
        "contentId": 21196233,
        "contentOrganizationCode": "gooru",
        "contentOrganizationName": "Gooru",
        "contentOrganizationUid": "4261739e-ccae-11e1-adfb-5404a609bd14",
        "creatorFirstname": "Ashley",
        "creatorId": "97cd124f-f10f-4f47-b3fe-9034bf0e5fb6",
        "creatorLastname": "W.",
        "creatornameDisplay": "washley",
        "description": "Students will learn the geography of India.  Students will also learn about the languages and dialects used in India.",
        "distinguish": 0,
        "folder": "f000/2119/6233/",
        "goals": "Students will learn the geography of India.  Students will also learn about the languages and dialects used in India.",
        "gooruUId": "97cd124f-f10f-4f47-b3fe-9034bf0e5fb6",
        "grade": "12",
        "id": "040552f5-1d88-4005-88ea-0066e2f3db0c",
        "isFeatured": 0,
        "lastModified": "2015-06-19T14:12:52.000Z",
        "libraryNames": [],
        "license": {
          "code": "",
          "definition": "",
          "icon": "",
          "name": "Other",
          "tag": "",
          "url": " "
        },
        "numberOfResources": 4,
        "profileUserVisibility": false,
        "questionCount": "0",
        "ratings": {
          "count": 0,
          "average": 0
        },
        "resourceCount": "4",
        "scollectionRemixCount": 0,
        "sharing": "public",
        "skills": [],
        "tags": [],
        "taxonomyDataSet": "{\"course\":[],\"subject\":[],\"curriculum\":{\"curriculumName\":[\"California Social Science State Standards\"],\"curriculumCode\":[\"CA.H-SS.WH10.4.2\",\"CA.H-SS.WH10.4.1\"],\"curriculumDesc\":[\"Discuss the locations of the colonial rule of such nations as England, France, Ger many, Italy, Japan, the Netherlands, Russia, Spain, Portugal, and the United States.\",\"Describe the rise of industrial economies and their link to imperialism and colonial ism (e.g., the role played by national security and strategic advantage; moral issues raised by the search for national hegemony, Social Darwinism, and the missionary impulse; material issues such as land, resources, and technology).\"]}}",
        "taxonomySkills": "",
        "thumbnail": "f000/2119/6233/040552f5-1d88-4005-88ea-0066e2f3db0c_838491c8-70c1-4ff8-8906-74a079b2435b.png",
        "thumbnails": {
          "defaultImage": false,
          "dimensions": "80x60,160x120",
          "url": "http://qacdn.gooru.org/qalive/f000/2119/6233/040552f5-1d88-4005-88ea-0066e2f3db0c_838491c8-70c1-4ff8-8906-74a079b2435b.png"
        },
        "title": "The Land of India",
        "type": "collection",
        "userFirstName": "Ashley",
        "userLastName": "W.",
        "usernameDisplay": "washley",
        "viewCount": 0
      }
    ],
    "stats": {
      "pageSize": 20,
      "totalHitCount": 32102
    },
    "totalHitCount": 32102
  };
  const expected = [SearchCollectionModel.create({
    id: '040552f5-1d88-4005-88ea-0066e2f3db0c',
    title: 'The Land of India',
    description: 'Students will learn the geography of India.  Students will also learn about the languages and dialects used in India.',
    resourceCount: 4,
    questionCount: 0,
    remixCount: 0,
    course: '',
    isPublic: true,
    isAssessment: false,
    thumbnailUrl: 'http://qacdn.gooru.org/qalive/f000/2119/6233/040552f5-1d88-4005-88ea-0066e2f3db0c_838491c8-70c1-4ff8-8906-74a079b2435b.png',
    owner: Ember.Object.create({
      id: '97cd124f-f10f-4f47-b3fe-9034bf0e5fb6',
      username: 'washley',
      firstName: 'Ashley',
      lastName: 'W.',
      avatarUrl: 'http://profile-images.goorulearning.org.s3.amazonaws.com/97cd124f-f10f-4f47-b3fe-9034bf0e5fb6.png'
    }),
    standards: [
      Ember.Object.create({
        code: 'CA.H-SS.WH10.4.2',
        description: 'Discuss the locations of the colonial rule of such nations as England, France, Ger many, Italy, Japan, the Netherlands, Russia, Spain, Portugal, and the United States.'
      }),
      Ember.Object.create({
        code: 'CA.H-SS.WH10.4.1',
        description: 'Describe the rise of industrial economies and their link to imperialism and colonial ism (e.g., the role played by national security and strategic advantage; moral issues raised by the search for national hegemony, Social Darwinism, and the missionary impulse; material issues such as land, resources, and technology).'
      })
    ]
  })];
  const normalizedCollections = serializer.normalizeSearchCollections(collectionsPayload);
  assert.deepEqual(normalizedCollections, expected, 'Wrong normalized response');
});

test('normalizeSearchResources', function(assert) {
  const serializer = this.subject();
  const resourcesPayload = {
    "searchResults": [
      {
        "description": "7th Grade Cells unit",
        "gooruOid": "415c37da-4727-11e5-8333-22000ac41a3c",
        "resourceFormat": {
          "value": "text_resource"
        },
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
        "resourceFormat": {
          "value": "text_resource"
        },
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

  const resources = serializer.normalizeSearchResources(resourcesPayload);
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
    "resourceFormat": {
      "value": "text_resource"
    },
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
    "gooruUId": "f8179782-c5e1-4c0f-85e5-7db5ff6b0c8d",
    "firstname": "Sachin",
    "lastname": "Zope",
    "usernameDisplay": "szope",
    "profileImageUrl": "any"
  };

  const owner = serializer.normalizeOwner(ownerData);
  assert.equal(owner.get("id"), 'f8179782-c5e1-4c0f-85e5-7db5ff6b0c8d', 'Wrong id');
  assert.equal(owner.get("firstName"), 'Sachin', 'Wrong first name');
  assert.equal(owner.get("lastName"), 'Zope', 'Wrong last name');
  assert.equal(owner.get("username"), 'szope', 'Wrong username');
  assert.equal(owner.get("avatarUrl"), 'any', 'Wrong avatar url');
});
