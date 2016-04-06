import { moduleFor, test } from 'ember-qunit';
import MyClassesModel from 'gooru-web/models/class/my-classes';
import ClassDetailsModel from 'gooru-web/models/class/class-details';

moduleFor('serializer:class/myClasses', 'Unit | Serializer | class/myClasses');

test('normalizeMyClasses', function(assert) {
  const serializer = this.subject();
  const myClassesPayload = {
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
  const expected = MyClassesModel.create({
    ownerList: [
      "d8b6eb04-5466-4e29-92f5-06584b6b6ef5",
      "2a0a0d90-faed-4ba4-9bab-04ddc4c18f30"
    ],
    collaboratorList: ["63dd64b2-bb30-47a9-8daf-8330f57e16c3"],
    memberList: ["e264cdc8-19d1-4285-88f5-5b359daf33da"],
    memberCount: {
      "d8b6eb04-5466-4e29-92f5-06584b6b6ef5": 1
    },
    classes: [ClassDetailsModel.create({
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
      gooruVersion: 3,
      contentVisibility: null,
      isArchived: false,
      isStudent: false
    }), ClassDetailsModel.create({
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
      gooruVersion: 3,
      contentVisibility: null,
      isArchived: false,
      isStudent: false
    })]
  });
  const normalizedMyClasses = serializer.normalizeMyClasses(myClassesPayload);
  assert.deepEqual(expected, normalizedMyClasses, 'Wrong normalized response');
});
