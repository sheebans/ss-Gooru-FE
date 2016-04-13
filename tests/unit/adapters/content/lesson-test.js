import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForAdapter from 'gooru-web/tests/helpers/module-for-adapter';

const sessionStub = Ember.Service.extend({
  "token-api3": 'token-api-3'
});

moduleForAdapter('adapter:content/lesson', 'Unit | Adapter | content/lesson', {
  unit: true,
  beforeEach: function () {
    this.register('service:session', sessionStub);
    this.inject.service('session');
  }
});

test('Lesson creation, success', function (assert) {
  // Mock backend response
  this.pretender.map(function () {
    this.post('/api/nucleus/v1/courses/course-id-123/units/unit-id-456/lessons', function () {
      return [
        201,
        {
          'Content-Type': 'text/plain',
          'location': 'lesson-id-789'
        },
        ''];
    });
  });

  const adapter = this.subject();

  const params = {
    courseId: 'course-id-123',
    unitId: 'unit-id-456',
    lesson: { title: 'Sample Lesson' }
  };

  adapter.createLesson(params)
    .then(function (response) {
      assert.equal(response, 'lesson-id-789', 'Should respond with the newly created ID for the unit');
    });
});

test('Lesson creation, failure', function (assert) {
  // Mock backend response
  this.pretender.map(function () {
    this.post('/api/nucleus/v1/courses/course-id-123/units/unit-id-456/lessons', function () {
      return [
        500,
        {'Content-Type': 'text/plain'},
        ''];
    });
  });

  const adapter = this.subject();

  const params = {
    courseId: 'course-id-123',
    unitId: 'unit-id-456',
    lesson: { title: 'Sample Lesson' }
  };

  adapter.createLesson(params)
    .catch(function (response) {
      assert.equal(response.status, '500', 'Error code');
    });
});
