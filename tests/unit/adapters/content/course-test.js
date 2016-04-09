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
          'Content-Type': 'application/json; charset=utf-8',
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

test('Get course by ID', function (assert) {
  const courseData = {
    title: 'Course Title'
  };

  this.pretender.map(function () {
    this.get('/api/nucleus/v1/courses/course-id-123', function () {
      return [
        201,
        {
          'Content-Type': 'application/json; charset=utf-8'
        },
        JSON.stringify(courseData)];
    });
  });

  const adapter = this.subject();
  adapter.getCourseById('course-id-123')
    .then(function (response) {
      assert.deepEqual(response, courseData, 'Should respond with the corresponding course data');
    });
});

test('Update course, success', function (assert) {
  this.pretender.map(function () {
    this.put('/api/nucleus/v1/courses/course-id-123', function () {
      return [
        204,
        {
          'Content-Type': 'application/json; charset=utf-8'
        },
        ''];
    });
  });

  const adapter = this.subject();

  const courseData = {
    courseId: 'course-id-123',
    course: {
      title: 'Course Title'
    }
  };

  adapter.updateCourse(courseData)
    .then(function (response) {
      assert.equal(response, '', 'Should respond with no content');
    });
});
