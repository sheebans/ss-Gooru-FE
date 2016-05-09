import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import Course from 'gooru-web/models/content/course';

moduleFor('serializer:content/course', 'Unit | Serializer | content/course');

test('serializeCreateCourse', function(assert) {
  const serializer = this.subject();

  const course = Course.create({
    title: 'course-title',
    description: 'course-description',
    thumbnailUrl: 'http://test-bucket01.s3.amazonaws.com/image-id.png',
    isVisibleOnProfile: true,
    taxonomy: [],
    subject: 'course-subject'
  });

  const expected = {
    title: course.title,
    description: course.description,
    thumbnail: 'image-id.png',
    visible_on_profile: course.isVisibleOnProfile,
    taxonomy: [],
    'subject_bucket': course.subject
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
    thumbnail: 'course-thumbnail-url',
    visible_on_profile: courseModel.isVisibleOnProfile,
    taxonomy: [],
    'subject_bucket': courseModel.subject
  };
  const serializedCourse = serializer.serializeUpdateCourse(courseModel);
  assert.deepEqual(serializedCourse, expectedSerializedCourse, 'Wrong serialized Course');
});

test('normalizeCourse', function (assert) {
  const serializer = this.subject();
  const contentCdnUrl = 'content-url/';
  serializer.set('session', Ember.Object.create({
    'cdnUrls': {
      content: contentCdnUrl
    }
  }));
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
    "metadata": null,
    "thumbnail": "thumbnail.png",
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
  const normalizedCourse = serializer.normalizeCourse(payload);
  assert.equal(normalizedCourse.get("id"), 'course-id', 'Wrong id');
  assert.equal(normalizedCourse.get("title"), 'Course title', 'Wrong title');
  assert.equal(normalizedCourse.get("description"), 'Course description', 'Wrong description');
  assert.equal(normalizedCourse.get("isPublished"), false, 'Wrong isPublished');
  assert.equal(normalizedCourse.get("isVisibleOnProfile"), true, 'Wrong isVisibleOnProfile');
  assert.equal(normalizedCourse.get("subject"), 'subject_bucket_value', 'Wrong subject');
  assert.equal(normalizedCourse.get("taxonomy"), 'taxonomy_value', 'Wrong taxonomy');
  assert.equal(normalizedCourse.get("unitCount"), 0, 'Wrong unitCount');
  assert.equal(normalizedCourse.get("children.length"), 2, 'Wrong children length');
  assert.equal(normalizedCourse.get("children")[0].get("id"), 'unit-id-1', 'Wrong first children id');
  assert.equal(normalizedCourse.get("thumbnailUrl"), contentCdnUrl + 'thumbnail.png', 'Wrong thumbnailUrl');
});

test('normalizeGetCourses', function(assert) {
  const serializer = this.subject();
  const contentCdnUrl = 'content-url/';
  serializer.set('session', Ember.Object.create({
    'cdnUrls': {
      content: contentCdnUrl
    }
  }));
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
  const normalizedCourses = serializer.normalizeGetCourses(coursesPayload);
  assert.equal(normalizedCourses.get("length"), 2, 'Wrong number of courses');
});
