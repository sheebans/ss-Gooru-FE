import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import Course from 'gooru-web/models/content/course';
import Unit from 'gooru-web/models/content/unit';
import { CREATOR_SYSTEM } from 'gooru-web/config/config';

moduleFor('serializer:content/course', 'Unit | Serializer | content/course');

test('serializeCreateCourse', function(assert) {
  const serializer = this.subject();

  const course = Course.create({
    title: 'course-title',
    description: 'course-description',
    thumbnailUrl: 'course-thumbnail-url',
    isVisibleOnProfile: true,
    taxonomy: [],
    subject: 'course-subject'
  });

  const expected = {
    title: course.title,
    description: course.description,
    thumbnail: course.thumbnailUrl,
    visible_on_profile: course.isVisibleOnProfile,
    taxonomy: [],
    'subject_bucket': course.subject,
    'creator_system': CREATOR_SYSTEM
  };
  const courseObject = serializer.serializeCreateCourse(course);
  assert.deepEqual(courseObject, expected, 'Serializer response');
});

test('serializeUpdateCourse', function (assert) {
  const serializer = this.subject();
  const courseModel = Course.create({
    id: 'course-id',
    title: 'course-title',
    description: 'course-description',
    thumbnailUrl: 'course-thumbnail-url',
    isVisibleOnProfile: true,
    taxonomy: [],
    subject: 'course-subject'
  });
  const expectedSerializedCourse = {
    title: courseModel.title,
    description: courseModel.description,
    thumbnail: courseModel.thumbnailUrl,
    visible_on_profile: courseModel.isVisibleOnProfile,
    taxonomy: [],
    'subject_bucket': courseModel.subject
  };
  const serializedCourse = serializer.serializeUpdateCourse(courseModel);
  assert.deepEqual(serializedCourse, expectedSerializedCourse, 'Wrong serialized Course');
});

test('normalizeCourse', function (assert) {
  const serializer = this.subject();
  const payload = {
    "id": "course-id",
    "title": "Course title",
    "description": "Course description",
    "owner_id": "owner-id",
    "creator_id": "owner-id",
    "original_creator_id": null,
    "modifier_id": "owner-id",
    "original_course_id": null,
    "publish_status": "unpublished",
    "publish_date": null,
    "thumbnail": "thumbnail.png",
    "metadata": null,
    "taxonomy": [
      "taxonomy_value"
    ],
    "collaborator": [
      "collaborator-id-1",
      "collaborator-id-2",
      "collaborator-id-3"
    ],
    "visible_on_profile": true,
    "is_deleted": false,
    "created_at": "2016-03-09T05:55:42Z",
    "updated_at": "2016-03-10T05:13:35Z",
    "sequence_id": 1,
    "subject_bucket": "subject_bucket_value",
    "creator_system": "gooru",
    "unit_summary": [
      {
        "unit_id": "unit-id-1",
        "title": "Unit 1",
        "sequence_id": 1
      },
      {
        "unit_id": "unit-id-2",
        "title": "Unit 2",
        "sequence_id": 2
      }
    ]
  };
  var expected = Course.create(Ember.getOwner(this).ownerInjection(), {
    children: [
      Unit.create(Ember.getOwner(this).ownerInjection(), {
        id: payload.unit_summary[0].unit_id,
        sequence: payload.unit_summary[0].sequence_id,
        title: payload.unit_summary[0].title,
        essentialQuestions: undefined,
        bigIdeas: undefined
      }),
      Unit.create(Ember.getOwner(this).ownerInjection(), {
        id: payload.unit_summary[1].unit_id,
        sequence: payload.unit_summary[1].sequence_id,
        title: payload.unit_summary[1].title,
        essentialQuestions: undefined,
        bigIdeas: undefined
      })
    ],
    description: payload.description,
    id: payload.id,
    isPublished: false,
    isVisibleOnProfile: payload.visible_on_profile,
    subject: payload.subject_bucket,
    taxonomy: payload.taxonomy.slice(0),
    thumbnailUrl: payload.thumbnail,
    title: payload.title,
    unitCount: 0
  });
  const normalizedCourse = serializer.normalizeCourse(payload);
  assert.deepEqual(normalizedCourse, expected, 'Wrong normalized Course');
});

test('normalizeGetCourses', function(assert) {
  const serializer = this.subject();
  const coursesPayload = {
    "courses": [
      {
        "id": "course-id-1",
        "title": "Test Course 1",
        "publish_status": "unpublished",
        "thumbnail": "thumbnail-1.png",
        "owner_id": "owner-id-1",
        "original_creator_id": null,
        "collaborator": null,
        "original_course_id": null,
        "taxonomy": [],
        "sequence_id": 1,
        "visible_on_profile": true,
        "unit_count": 5,
        "owner_info": {
          "id": "owner-id-1",
          "firstname": "Florinda",
          "lastname": "Meza",
          "thumbnail_path": null,
          "school_district_id": null
        }
      },
      {
        "id": "3fc882b2-dd9e-4957-9498-386984f156f7",
        "title": "Test Course 2",
        "publish_status": "published",
        "thumbnail": "",
        "owner_id": "owner-id-2",
        "original_creator_id": null,
        "collaborator": null,
        "original_course_id": null,
        "taxonomy": [],
        "sequence_id": 1,
        "visible_on_profile": true,
        "unit_count": null,
        "owner_info": {
          "id": "owner-id-2",
          "firstname": "Roberto",
          "lastname": "Gomez",
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
    Course.create(Ember.getOwner(this).ownerInjection(), {
      children: [],
      description: undefined,
      id: coursesPayload.courses[0].id,
      isPublished: false,
      isVisibleOnProfile: coursesPayload.courses[0].visible_on_profile,
      subject: undefined,
      taxonomy: coursesPayload.courses[0].taxonomy.slice(0),
      thumbnailUrl: coursesPayload.courses[0].thumbnail,
      title: coursesPayload.courses[0].title,
      unitCount: coursesPayload.courses[0].unit_count
    }),
    Course.create(Ember.getOwner(this).ownerInjection(), {
      children: [],
      description: undefined,
      id: coursesPayload.courses[1].id,
      isPublished: true,
      isVisibleOnProfile: coursesPayload.courses[1].visible_on_profile,
      subject: undefined,
      taxonomy: coursesPayload.courses[1].taxonomy.slice(0),
      thumbnailUrl: coursesPayload.courses[1].thumbnail,
      title: coursesPayload.courses[1].title,
      unitCount: 0
    })
  ];
  const normalizedCourses = serializer.normalizeGetCourses(coursesPayload);
  assert.deepEqual(normalizedCourses, expected, 'Wrong normalized response');
});
