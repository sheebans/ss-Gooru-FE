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
      assert.equal(response.get('context') , 'normalized-map-context', 'Wrong map context');
      assert.equal(response.get('suggestions'), 'normalized-map-suggestions', 'Wrong map suggestions');
      done();
    });
});

test('getCurrentMapContext', function(assert) {
  const service = this.subject();
  assert.expect(4);

  service.set('serializer', Ember.Object.create({
    normalizeMapContext: function(payload) {
      assert.equal(payload, 'next-map-context', 'Wrong payload');
      return 'normalized-map-context';
    }
  }));

  service.set('adapter', Ember.Object.create({
    getCurrentMapContext: function(courseId, classId) {
      assert.equal(courseId, 123, 'Wrong course id');
      assert.equal(classId, 321, 'Wrong class id');
      return Ember.RSVP.resolve('next-map-context');
    }
  }));

  var done = assert.async();
  service.getCurrentMapContext(123, 321)
    .then(function(response) {
      assert.equal(response , 'normalized-map-context', 'Wrong map context');
      done();
    });
});

test('continueCourse', function(assert) {
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
  service.continueCourse('course-id', 'class-id')
    .then(function(response) {
      assert.equal(response, 'fake-response', 'Wrong response');
      done();
    });
});

test('startCollection', function(assert) {
  const service = this.subject({
    next: function(mapContext) {
      assert.equal(mapContext.get('courseId'), 'course-id', 'Wrong course id');
      assert.equal(mapContext.get('unitId'), 'unit-id', 'Wrong unit id');
      assert.equal(mapContext.get('lessonId'), 'lesson-id', 'Wrong lesson id');
      assert.equal(mapContext.get('collectionId'), 'collection-id', 'Wrong collection id');
      assert.equal(mapContext.get('collectionType'), 'collection-type', 'Wrong collection type');
      assert.equal(mapContext.get('itemId'), 'collection-id', 'Wrong item id');
      assert.equal(mapContext.get('itemType'), 'collection-type', 'Wrong item type');
      assert.equal(mapContext.get('classId'), 'class-id', 'Wrong class id');
      assert.equal(mapContext.get('status'), 'start', 'Wrong status');
      return Ember.RSVP.resolve('fake-response');
    }
  });
  assert.expect(10);

  var done = assert.async();
  service.startCollection('course-id', 'unit-id', 'lesson-id', 'collection-id', 'collection-type', 'class-id')
    .then(function(response) {
      assert.equal(response, 'fake-response', 'Wrong response');
      done();
    });
});

test('startLesson', function(assert) {
  const service = this.subject({
    next: function(mapContext) {
      assert.equal(mapContext.get('courseId'), 'course-id', 'Wrong course id');
      assert.equal(mapContext.get('unitId'), 'unit-id', 'Wrong unit id');
      assert.equal(mapContext.get('lessonId'), 'lesson-id', 'Wrong lesson id');
      assert.equal(mapContext.get('classId'), 'class-id', 'Wrong class id');
      assert.equal(mapContext.get('status'), 'start', 'Wrong status');
      return Ember.RSVP.resolve('fake-response');
    }
  });
  assert.expect(6);

  var done = assert.async();
  service.startLesson('course-id', 'unit-id', 'lesson-id', 'class-id')
    .then(function(response) {
      assert.equal(response, 'fake-response', 'Wrong response');
      done();
    });
});
