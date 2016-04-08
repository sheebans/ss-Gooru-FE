import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForAdapter from 'gooru-web/tests/helpers/module-for-adapter';

const sessionStub = Ember.Service.extend({
  "token-api3": 'token-api-3'
});

moduleForAdapter('adapter:content/course', 'Unit | Adapter | content/course', {
  unit: true,
  beforeEach: function () {
    this.register('service:session', sessionStub);
    this.inject.service('session');
  }
});

test('Course creation, success', function (assert) {
  this.pretender.map(function () {
    this.post('/api/nucleus/v1/courses', function () {
      return [
        201,
        {
          'Content-Type': 'text/plain',
          'Location': 'course-id-123'
        },
        ''];
    });
  });

  const adapter = this.subject();

  const courseData = {
    title: 'Course Title'
  };

  adapter.createCourse(courseData)
    .then(function (courseId) {
      assert.equal(courseId, 'course-id-123', 'Should respond with the newly created ID for the course');
    });
});
