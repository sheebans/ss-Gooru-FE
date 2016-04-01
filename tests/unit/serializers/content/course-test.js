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
