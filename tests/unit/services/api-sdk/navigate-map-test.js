import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:api-sdk/navigate-map', 'Unit | Service | api-sdk/navigate-map', {
});

test('next', function(assert) {
  const service = this.subject();
  assert.expect(6);

  service.set('serializer', Ember.Object.create({
    serializeMapContext: function(data) {
      assert.equal(data, 'fake-map-context', 'Wrong data');
      return 'serialized-map-context'; //fake response
    },
    normalizeMapContext: function(payload) {
      assert.equal(payload, 'next-map-context', 'Wrong payload');
      return 'normalized-map-context';
    },
    normalizeMapSuggestions: function (payload) {
      assert.equal(payload, 'suggested-content', 'Wrong payload');
      return 'normalized-map-suggestions';
    }
  }));

  service.set('adapter', Ember.Object.create({
    next: function(mapContext) {
      assert.equal(mapContext, 'serialized-map-context', 'Wrong map context');
      return Ember.RSVP.resolve({
        context: 'next-map-context',
        suggestions: 'suggested-content'
      });
    }
  }));

  var done = assert.async();
  service.next('fake-map-context')
    .then(function(response) {
      assert.equal(response.context, 'normalized-map-context', 'Wrong map context');
      assert.equal(response.suggestions, 'normalized-map-suggestions', 'Wrong map suggestions');
      done();
    });
});

test('continue', function(assert) {
  const service = this.subject({
    next: function(mapContext) {
      assert.equal(mapContext.get('courseId'), 'course-id', 'Wrong course id');
      assert.equal(mapContext.get('classId'), 'class-id', 'Wrong class id');
      assert.equal(mapContext.get('status'), 'continue', 'Wrong status');
      return Ember.RSVP.resolve('fake-response');
    }
  });
  assert.expect(4);

  var done = assert.async();
  service.continue('course-id', 'class-id')
    .then(function(response) {
      assert.equal(response, 'fake-response', 'Wrong response');
      done();
    });
});

test('start', function(assert) {
  const service = this.subject({
    next: function(mapContext) {
      assert.equal(mapContext.get('status'), 'start', 'Wrong status');
      return Ember.RSVP.resolve('fake-response');
    }
  });
  assert.expect(2);

  var done = assert.async();
  const mapContext = Ember.Object.create({ status: 'any' });
  service.start(mapContext)
    .then(function(response) {
      assert.equal(response, 'fake-response', 'Wrong response');
      done();
    });
});
