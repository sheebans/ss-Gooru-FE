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
    audience: [],
    subject: 'course-subject'
  });

  const expected = {
    title: course.title,
    description: course.description,
    thumbnail: course.thumbnailUrl,
    visible_on_profile: course.isVisibleOnProfile,
    taxonomy: [],
    audience: [],
    'subject_bucket': course.subject,
    'creator_system': CREATOR_SYSTEM
  };
  const courseObject = serializer.serializeCreateCourse(course);
  assert.deepEqual(courseObject, expected, 'Serializer response');
});

test('serializeUpdateCourse', function (assert) {
  const serializer = this.subject();

  const course = Course.create({
    title: 'course-title',
    description: 'course-description',
    thumbnailUrl: 'course-thumbnail-url',
    isVisibleOnProfile: true,
    taxonomy: [],
    audience: [],
    subject: 'course-subject'
  });

  const expected = {
    title: course.title,
    description: course.description,
    thumbnail: course.thumbnailUrl,
    visible_on_profile: course.isVisibleOnProfile,
    taxonomy: [],
    audience: [],
    'subject_bucket': course.subject
  };
  const courseObject = serializer.serializeUpdateCourse(course);
  assert.deepEqual(courseObject, expected, 'Serializer response');
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
    "audience": [
      54,
      23
    ],
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
        title: payload.unit_summary[0].title
      }),
      Unit.create(Ember.getOwner(this).ownerInjection(), {
        id: payload.unit_summary[1].unit_id,
        sequence: payload.unit_summary[1].sequence_id,
        title: payload.unit_summary[1].title
      })
    ],
    id: payload.id,
    isPublic: payload.visible_on_profile,
    title: payload.title,
    description: payload.description,
    thumbnailUrl: payload.thumbnail,
    isVisibleOnProfile: payload.visible_on_profile,
    audience: payload.audience.slice(0),
    subject: payload.subject_bucket,
    taxonomy: payload.taxonomy.slice(0)
  });

  const result = serializer.normalizeCourse(payload);
  assert.deepEqual(result, expected, 'Serialized response');
});
