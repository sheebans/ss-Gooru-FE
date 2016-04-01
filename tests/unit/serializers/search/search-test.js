import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import SearchCollectionModel from 'gooru-web/models/search/collection';
import SearchResourceModel from 'gooru-web/models/search/resource';

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
    "executionTime": 1329,
    "query": {
      "userQueryString": "sun",
      "rewrittenQueryString": "sun"
    },
    "resultCount": 8,
    "searchCount": 0,
    "searchResults": [
      {
        "addDate": 1366795926000,
        "aggregator": [
          "My Mobile University"
        ],
        "assetURI": "http://qacdn.gooru.org/qalive/",
        "batchId": "SXV-38",
        "brokenStatus": 0,
        "category": "Website",
        "collaboratorCount": 0,
        "contentId": 2266551,
        "contentPermissions": [],
        "creator": {
          "emailId": "",
          "firstName": "Rocky",
          "gooruUId": "ee410cef-2a44-46ef-878d-172511e54e07",
          "isDeleted": false,
          "lastName": "Shore",
          "organizationName": "gooru",
          "partyUid": "ee410cef-2a44-46ef-878d-172511e54e07",
          "profileImageUrl": "http://profile-qa.s3.amazonaws.com/ee410cef-2a44-46ef-878d-172511e54e07.png",
          "userRoleSetString": "",
          "username": "Rocky",
          "usernameDisplay": "Rocky"
        },
        "customFields": {
          "cfAccessMode": "Visual | Auditory | Textual",
          "SlNO": "3",
          "cfCountryCode": "NZ",
          "cfDataType": "SWF",
          "DomainAuthority": "Assumed",
          "cfPriority": "2",
          "cfEndUser": "Student",
          "MID": "3642",
          "ReadingLevel": "4 | 5 | 6 | 7",
          "cfUrl": "http://www.sciencekids.co.nz/gamesactivities/earthsunmoon.html",
          "cfCrawlOrigin": "NextWealth",
          "cfVersion": "1.8",
          "cfCopyrightHolder": "Science Kids ©",
          "cfTitle": "Earth, Sun & Moon",
          "ID": "2",
          "cfLanguageCode": "eng",
          "cfBrandAttribution": "Science Kids",
          "cfDescription": "Science Kids presents Earth, Sun & Moon, an educational activity resource on science.",
          "cfLicenseCode": "Not Available",
          "cfGradeLevel": "4",
          "cfGooruSubject": "Science",
          "InstructionalUse": "Activity",
          "cfSeriesTitle": "Science Games",
          "cfAggregator": "My Mobile University",
          "cfGooruCourse": "Science 4",
          "cfControlFlexibility": "Full Mouse Control",
          "cfAuthor": "Rene Smith",
          "cfCrawlMethod": "Mozenda",
          "cfSize": "Flounder",
          "cfFileCode": "00003642002",
          "cfLearningMode": "Active",
          "cfDateCreated": "null",
          "cfImportMode": "Update",
          "cfScriptCode": "Latn",
          "cfLicense": "Not Available",
          "cfMediaFeature": "Long Description",
          "cfResourceType": "Website"
        },
        "description": "Science Kids presents Earth, Sun & Moon, an educational activity resource on science.",
        "distinguish": 0,
        "entryId": "2266551",
        "folder": "f000/0226/6551/",
        "gooruOid": "4a3a0e88-564d-4449-bc65-acbb44fe3a80",
        "grade": "10,1,4,9,11,12",
        "hasFrameBreaker": false,
        "indexId": "2266551",
        "indexType": "resource",
        "instructional": {
          "value": "activity"
        },
        "isDeleted": 0,
        "isFeatured": 0,
        "isFeaturedBoolean": false,
        "isNew": false,
        "isOer": 0,
        "lastModified": 1410138009000,
        "lastModifiedString": "2014-09-08T01:00:09.000Z",
        "libraryNames": [],
        "license": {
          "code": "Not Available",
          "name": "non-exclusive license",
          "url": "http://creative.common.org"
        },
        "mediaType": "iPad_friendly",
        "publisher": [
          "Science Kids"
        ],
        "ratings": {
          "count": 2,
          "reviewCount": 0,
          "average": 4
        },
        "recordSource": "goorucrawled",
        "resourceAddedCount": 12,
        "resourceFormat": {
          "value": "interactive"
        },
        "resourceSource": {
          "activeStatus": 1,
          "attribution": "Science Kids",
          "domainName": "sciencekids.co.nz",
          "frameBreaker": 0,
          "resourceSourceId": 105153,
          "sourceName": "Science Kids",
          "type": "normalDomain"
        },
        "resourceTags": [],
        "resourceType": {
          "name": "resource/url"
        },
        "resourceUsedUserCount": 7,
        "resultUId": "46e0b9a9-83f8-4d46-b7f1-3517565f789a",
        "s3UploadFlag": 0,
        "scollectionIds": "b215ac37-09f0-4e36-b631-cab218c64bf6 || dc0dc910-e34d-4901-8f75-a9b0670ac6f8 || 6335f629-027a-468a-8bc6-6c57b0ff8138 || 2c930be0-6716-465f-8859-4174a1f261fd || 6bff41c1-aacf-4712-ba77-4c7b4ca45013 || 34210eb9-3ce3-4e36-a7ae-4f6f116cb3c0 || d413376b-12e2-414b-880d-3604586ccca1 || 18cbd148-7422-4df5-8512-d60c699bb663 || 96ec5605-e9e6-4a6b-83c6-1ae8bf490743 || 089d80c8-4aee-43ad-9f8d-d5d547a6fdf3 || 78b8baa1-2bc3-4d5e-8376-d8e52f6d0359 || 156c1a97-88e2-4b0b-bbfc-6d803503af3e",
        "scollectionTitles": "The Moon || The Moon || new || The Moon || The Moon || Patterns of the Sun, Moon, and Stars || The Moon || The Moon || Solar System || The Moon || The Moon || The Moon",
        "sharing": "public",
        "taxonomyDataSet": "{\"course\":[\"Grade 1 Science\",\"Astronomy\",\"Grade 4 Science\"],\"subject\":[\"Science\"],\"curriculum\":{\"curriculumName\":[\"Next Generation Science Standards\"],\"curriculumCode\":[\"NGSS-1-ESS1-1\"],\"curriculumDesc\":[\"Use observations of the sun, moon, and stars to describe patterns that can be predicted.\"]}}",
        "taxonomySet": [],
        "thumbnail": "",
        "thumbnails": {
          "url": "http://qacdn.gooru.org/qalive/f000/0228/9004/6c3348c2-f277-4522-8bc7-9530b9f77b49.png"
        },
        "title": "Earth, Sun & Moon",
        "url": "http://www.sciencekids.co.nz/gamesactivities/earthsunmoon.html",
        "viewCount": 7,
        "views": 0
      }
    ],
    "stats": {
      "pageSize": 8,
      "totalHitCount": 2430
    },
    "totalHitCount": 2430
  };
  const expected = [SearchResourceModel.create({
    title: 'Earth, Sun & Moon',
    description: 'Science Kids presents Earth, Sun & Moon, an educational activity resource on science.',
    format: 'interactive',
    publisher: 'Science Kids',
    thumbnailUrl: 'http://qacdn.gooru.org/qalive/f000/0228/9004/6c3348c2-f277-4522-8bc7-9530b9f77b49.png',
    url: 'http://www.sciencekids.co.nz/gamesactivities/earthsunmoon.html',
    owner: Ember.Object.create({
      id: 'ee410cef-2a44-46ef-878d-172511e54e07',
      firstName: 'Rocky',
      lastName: 'Shore',
      username: 'Rocky',
      avatarUrl: 'http://profile-qa.s3.amazonaws.com/ee410cef-2a44-46ef-878d-172511e54e07.png'
    }),
    standards: [
      Ember.Object.create({
        code: 'NGSS-1-ESS1-1',
        description: 'Use observations of the sun, moon, and stars to describe patterns that can be predicted.'
      })
    ]
  })];
  const normalizedResources = serializer.normalizeSearchResources(resourcesPayload);
  assert.deepEqual(normalizedResources, expected, 'Wrong normalized response');
});
