import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import ClassModel from 'gooru-web/models/content/class';
import ClassesModel from 'gooru-web/models/content/classes';
import ProfileModel from 'gooru-web/models/profile/profile';

moduleFor('serializer:content/class', 'Unit | Serializer | content/class');

test('serializeCreateClass', function(assert) {
  const serializer = this.subject();
  const classObject = ClassModel.create({
    title: 'class-title',
    classSharing: 'open'
  });
  const expected = {
    title: 'class-title',
    class_sharing: 'open'
  };
  const response = serializer.serializeCreateClass(classObject);
  assert.deepEqual(expected, response, 'Wrong serialized response');
});

test('normalizeClasses', function(assert) {
  const serializer = this.subject();
  const classesPayload = {
    "owner": [
      "d8b6eb04-5466-4e29-92f5-06584b6b6ef5",
      "2a0a0d90-faed-4ba4-9bab-04ddc4c18f30"
    ],
    "collaborator": ["63dd64b2-bb30-47a9-8daf-8330f57e16c3"],
    "member": ["e264cdc8-19d1-4285-88f5-5b359daf33da"],
    "member_count": {
      "d8b6eb04-5466-4e29-92f5-06584b6b6ef5": 1
    },
    "classes": [{
      "id": "d8b6eb04-5466-4e29-92f5-06584b6b6ef5",
      "creator_id": "2afaf0fd-ed92-48c5-9195-7f4bc1e0064e",
      "title": "My class - 1",
      "description": "This class is intended to make awareness of good habits",
      "greeting": "Hi! Welcome to my class",
      "grade": [
        4,
        5
      ],
      "class_sharing": "open",
      "cover_image": "e264cdc8-19d1-4285-88f5-5b359daf33da.png",
      "code": "VZFMEWH",
      "min_score": 75,
      "end_date": "2016-12-31",
      "course_id": null,
      "collaborator": [
        "63dd64b2-bb30-47a9-8daf-8330f57e16c3",
        "E4510f0a-a4a1-46d8-b7c3-fce31754c7d8"
      ],
      "gooru_version": 3,
      "content_visibility": null,
      "is_archived": false
    }, {
      "id": "2a0a0d90-faed-4ba4-9bab-04ddc4c18f30",
      "creator_id": "2afaf0fd-ed92-48c5-9195-7f4bc1e0064e",
      "title": "My class - 2",
      "description": "This class is intended to make awareness of good habits",
      "greeting": "Hi! Welcome to my class",
      "grade": [
        4,
        5
      ],
      "class_sharing": "open",
      "cover_image": "e264cdc8-19d1-4285-88f5-5b359daf33da.png",
      "code": "ALU3LCB",
      "min_score": 75,
      "end_date": "2016-12-31",
      "course_id": null,
      "collaborator": [
        "63dd64b2-bb30-47a9-8daf-8330f57e16c3",
        "E4510f0a-a4a1-46d8-b7c3-fce31754c7d8"
      ],
      "gooru_version": 3,
      "content_visibility": null,
      "is_archived": false
    }]
  };
  const expected = ClassesModel.create({
    ownerList: [
      "d8b6eb04-5466-4e29-92f5-06584b6b6ef5",
      "2a0a0d90-faed-4ba4-9bab-04ddc4c18f30"
    ],
    collaboratorList: ["63dd64b2-bb30-47a9-8daf-8330f57e16c3"],
    memberList: ["e264cdc8-19d1-4285-88f5-5b359daf33da"],
    memberCount: {
      "d8b6eb04-5466-4e29-92f5-06584b6b6ef5": 1
    },
    classes: [ClassModel.create({
      id: "d8b6eb04-5466-4e29-92f5-06584b6b6ef5",
      creatorId: "2afaf0fd-ed92-48c5-9195-7f4bc1e0064e",
      title: "My class - 1",
      description: "This class is intended to make awareness of good habits",
      greeting: "Hi! Welcome to my class",
      grade: [
        4,
        5
      ],
      classSharing: "open",
      coverImage: "e264cdc8-19d1-4285-88f5-5b359daf33da.png",
      code: "VZFMEWH",
      minScore: 75,
      endDate: "2016-12-31",
      courseId: null,
      collaborator: [
        "63dd64b2-bb30-47a9-8daf-8330f57e16c3",
        "E4510f0a-a4a1-46d8-b7c3-fce31754c7d8"
      ],
      creatorSystem: null,
      contentVisibility: null,
      isArchived: false,
      isStudent: false
    }), ClassModel.create({
      id: "2a0a0d90-faed-4ba4-9bab-04ddc4c18f30",
      creatorId: "2afaf0fd-ed92-48c5-9195-7f4bc1e0064e",
      title: "My class - 2",
      description: "This class is intended to make awareness of good habits",
      greeting: "Hi! Welcome to my class",
      grade: [
        4,
        5
      ],
      classSharing: "open",
      coverImage: "e264cdc8-19d1-4285-88f5-5b359daf33da.png",
      code: "ALU3LCB",
      minScore: 75,
      endDate: "2016-12-31",
      courseId: null,
      collaborator: [
        "63dd64b2-bb30-47a9-8daf-8330f57e16c3",
        "E4510f0a-a4a1-46d8-b7c3-fce31754c7d8"
      ],
      creatorSystem: null,
      contentVisibility: null,
      isArchived: false,
      isStudent: false
    })]
  });
  const normalizedClasses = serializer.normalizeClasses(classesPayload);
  assert.deepEqual(expected, normalizedClasses, 'Wrong normalized response');
});

test('normalizeReadClassInfo', function(assert) {
  const serializer = this.subject();
  const classPayload = {
    "id": "d44d3928-2623-4925-9d38-e933650a7573",
    "creator_id": "327598a1-109a-4bcc-be9a-357981711381",
    "created_at": '2016-01-01',
    "title": "My Class 1",
    "description": 'Class description',
    "greeting": 'Greeting message',
    "grade": null,
    "class_sharing": "open",
    "cover_image": 'image-name',
    "code": "ABC123",
    "min_score": 10,
    "end_date": "2016-01-01",
    "course_id": "d44d3928-2623-4925-9d38-e933650a7573",
    "collaborator": null,
    "gooru_version": 3,
    "content_visibility": null,
    "is_archived": false
  };
  const expected = ClassModel.create({
    id: 'd44d3928-2623-4925-9d38-e933650a7573',
    code: 'ABC123',
    title: 'My Class 1',
    description: 'Class description',
    greeting: 'Greeting message',
    grade: [],
    classSharing: 'open',
    coverImage: 'image-name',
    minScore: 10,
    startDate: '2016-01-01',
    endDate: '2016-01-01',
    collaborator: [],
    creatorSystem: ''
  });

  const normalizedClassInfo = serializer.normalizeReadClassInfo(classPayload);
  assert.deepEqual(normalizedClassInfo, expected, 'Wrong normalized response');
});

test('normalizeReadClassMembers', function(assert) {
  const serializer = this.subject();
  const classPayload = {
    "owner": ["08fd3a1a-8118-4b02-ab59-c0b4a5037863"],
    "collaborator": [],
    "member": ["e568193d-603a-4c3a-a5d2-320579d32f3f"],
    "invitees": [],
    "details": [{
      "id": "08fd3a1a-8118-4b02-ab59-c0b4a5037863",
      "firstname": "Jeffrey",
      "lastname": "Bermudez",
      "thumbnail_path": null
    }, {
      "id": "e568193d-603a-4c3a-a5d2-320579d32f3f",
      "firstname": "Jeffrey",
      "lastname": "Bermudez",
      "thumbnail_path": null
    }]
  };
  const expected = Ember.Object.create({
    owner: ProfileModel.create({
      id: '08fd3a1a-8118-4b02-ab59-c0b4a5037863',
      firstName: 'Jeffrey',
      lastName: 'Bermudez',
      aboutMe: undefined,
      country: undefined,
      countryId: undefined,
      createdAt: undefined,
      dateOfBirth: undefined,
      email: undefined,
      followers: undefined,
      followings: undefined,
      gender: undefined,
      grades: undefined,
      lastUpdate: undefined,
      role: undefined,
      rosterId: undefined,
      school: undefined,
      schoolId: undefined,
      schoolDistrict: undefined,
      schoolDistrictId: undefined,
      state: undefined,
      stateId: undefined,
      username: undefined
    }),
    collaborators: [],
    members: [
      ProfileModel.create({
        id: 'e568193d-603a-4c3a-a5d2-320579d32f3f',
        firstName: 'Jeffrey',
        lastName: 'Bermudez',
        aboutMe: undefined,
        country: undefined,
        countryId: undefined,
        createdAt: undefined,
        dateOfBirth: undefined,
        email: undefined,
        followers: undefined,
        followings: undefined,
        gender: undefined,
        grades: undefined,
        lastUpdate: undefined,
        role: undefined,
        rosterId: undefined,
        school: undefined,
        schoolId: undefined,
        schoolDistrict: undefined,
        schoolDistrictId: undefined,
        state: undefined,
        stateId: undefined,
        username: undefined
      })
    ]
  });
  const normalizedClassMembers = serializer.normalizeReadClassMembers(classPayload);
  assert.deepEqual(normalizedClassMembers, expected, 'Wrong normalized response');
});
