import { moduleFor, test } from 'ember-qunit';
import CourseModel from 'gooru-web/models/content/course';

moduleFor('serializer:content/course', 'Unit | Serializer | content/course');

test('serializeCreateCourse', function(assert) {
  const serializer = this.subject();
  const courseObject = CourseModel.create({
    title: 'course-title',
    description: 'course-description',
    thumbnailUrl: 'course-thumbnail-url',
    isVisibleOnProfile: true,
    taxonomy: [],
    audience: [],
    subject: 'course-subject'
  });
  const expected = {
    title: 'course-title',
    description: 'course-description',
    thumbnail: 'course-thumbnail-url',
    'visible_on_profile': true,
    taxonomy: [],
    audience: [],
    'subject_bucket': 'course-subject',
    'creator_system': 'gooru'
  };
  const response = serializer.serializeCreateCourse(courseObject);
  assert.deepEqual(expected, response, 'Wrong serialized response');
});

test('normalizeGetCourses', function(assert) {
  const serializer = this.subject();
  const coursesPayload = {
    "courses": [
      {
        "id": "2fd4971b-68bc-42c9-8f02-e8fc16996363",
        "title": "Course Test Jeff01",
        "publish_status": "unpublished",
        "thumbnail": "74266efb-74eb-45de-a6a8-4052710af82c.png",
        "owner_id": "08fd3a1a-8118-4b02-ab59-c0b4a5037863",
        "original_creator_id": null,
        "collaborator": null,
        "original_course_id": null,
        "taxonomy": [],
        "sequence_id": 1,
        "visible_on_profile": true,
        "unit_count": 5,
        "owner_info": {
          "id": "08fd3a1a-8118-4b02-ab59-c0b4a5037863",
          "firstname": "Jeffrey",
          "lastname": "Bermudez",
          "thumbnail_path": null,
          "school_district_id": null
        }
      },
      {
        "id": "3fc882b2-dd9e-4957-9498-386984f156f7",
        "title": "Jeff Course02",
        "publish_status": "unpublished",
        "thumbnail": "",
        "owner_id": "08fd3a1a-8118-4b02-ab59-c0b4a5037863",
        "original_creator_id": null,
        "collaborator": null,
        "original_course_id": null,
        "taxonomy": [],
        "sequence_id": 1,
        "visible_on_profile": true,
        "unit_count": null,
        "owner_info": {
          "id": "08fd3a1a-8118-4b02-ab59-c0b4a5037863",
          "firstname": "Jeffrey",
          "lastname": "Bermudez",
          "thumbnail_path": null,
          "school_district_id": null
        }
      }
    ],
    "filters": {
      "subject": null,
      "limit": 10,
      "offset": 0
    }
  };
  const expected = [
    CourseModel.create({
      id: '2fd4971b-68bc-42c9-8f02-e8fc16996363',
      title: 'Course Test Jeff01',
      thumbnailUrl: '74266efb-74eb-45de-a6a8-4052710af82c.png',
      taxonomy: [],
      isVisibleOnProfile: true,
      isPublished: false,
      unitCount: 5
    }),
    CourseModel.create({
      id: '3fc882b2-dd9e-4957-9498-386984f156f7',
      title: 'Jeff Course02',
      thumbnailUrl: '',
      taxonomy: [],
      isVisibleOnProfile: true,
      isPublished: false,
      unitCount: 0
    })
  ];
  const normalizedCourses = serializer.normalizeGetCourses(coursesPayload);
  assert.deepEqual(normalizedCourses, expected, 'Wrong normalized response');
});
