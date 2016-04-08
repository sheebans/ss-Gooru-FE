import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForAdapter from 'gooru-web/tests/helpers/module-for-adapter';

const sessionStub = Ember.Service.extend({
  "token-api3": 'token-api-3'
});

moduleForAdapter('adapter:content/unit', 'Unit | Adapter | content/unit', {
  unit: true,
  beforeEach: function () {
    this.register('service:session', sessionStub);
    this.inject.service('session');
  }
});

test('Unit creation, success', function (assert) {
  // Mock backend response
  this.pretender.map(function () {
    this.post('/api/nucleus/v1/courses/course-id-123/units', function () {
      return [
        201,
        {
          'Content-Type': 'text/plain',
          'location': 'unit-id-456'
        },
        ''];
    });
  });

  const adapter = this.subject();

  const params = {
    courseId: 'course-id-123',
    unit: {title: 'Sample Unit'}
  };

  adapter.createUnit(params)
    .then(function (response) {
      assert.equal(response, 'unit-id-456', 'Should respond with the newly created ID for the unit');
    });
});

test('Unit creation, failure', function (assert) {
  // Mock backend response
  this.pretender.map(function () {
    this.post('/api/nucleus/v1/courses/course-id-123/units', function () {
      return [
        500,
        {'Content-Type': 'text/plain'},
        ''];
    });
  });

  const adapter = this.subject();

  const params = {
    courseId: 'course-id-123',
    unit: {title: 'Sample Unit'}
  };

  adapter.createUnit(params)
    .catch(function (response) {
      assert.equal(response.status, '500', 'Error code');
    });
});
