import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:api-sdk/search', 'Unit | Service | api-sdk/search', {
  // needs: []
});

test('searchCollections', function(assert) {
  const service = this.subject();

  assert.expect(3);
  service.set('searchAdapter', Ember.Object.create({
    searchCollections: function(term) {
      assert.equal(term, 'the-term', 'Wrong search collections term');
      assert.ok(true, 'searchCollections() function was called' );
      return Ember.RSVP.resolve({});
    }
  }));

  service.set('searchSerializer', Ember.Object.create({
    normalizeSearchCollections: function(payload) {
      assert.deepEqual({}, payload, 'Wrong search collections payload');
      return {};
    }
  }));

  var done = assert.async();
  service.searchCollections('the-term')
    .then(function() {
      done();
    });
});

test('searchAssessments', function(assert) {
  const service = this.subject();

  assert.expect(3);
  service.set('searchAdapter', Ember.Object.create({
    searchAssessments: function(term) {
      assert.equal(term, 'the-term', 'Wrong search collections term');
      assert.ok(true, 'searchAssessments() function was called' );
      return Ember.RSVP.resolve({});
    }
  }));

  service.set('searchSerializer', Ember.Object.create({
    normalizeSearchAssessments: function(payload) {
      assert.deepEqual({}, payload, 'Wrong search collections payload');
      return {};
    }
  }));

  var done = assert.async();
  service.searchAssessments('the-term')
    .then(function() {
      done();
    });
});

test('searchResources', function(assert) {
  const service = this.subject();

  assert.expect(4);

  service.set('searchAdapter', Ember.Object.create({
    searchResources: function(term, categories) {
      assert.equal(term, 'the-term', 'Wrong search resources term');
      assert.deepEqual(categories, ['image', 'interactive', 'question'], 'Wrong categories value');
      assert.ok(true, 'searchResources() function was called' );
      return Ember.RSVP.resolve({});
    }
  }));

  service.set('searchSerializer', Ember.Object.create({
    normalizeSearchResources: function(payload) {
      assert.deepEqual({}, payload, 'Wrong search resources payload');
      return {};
    }
  }));

  var done = assert.async();
  service.searchResources('the-term', ['image', 'interactive', 'question'])
    .then(function() {
      done();
    });
});

test('searchFeaturedCourses', function(assert) {
  const service = this.subject();

  assert.expect(3);

  service.set('searchAdapter', Ember.Object.create({
    searchFeaturedCourses: function(term) {
      assert.equal(term, 'the-term', 'Wrong search course term');
      assert.ok(true, 'searchFeaturedCourses() function was called' );
      return Ember.RSVP.resolve({});
    }
  }));

  service.set('searchSerializer', Ember.Object.create({
    normalizeSearchCourses: function(payload) {
      assert.deepEqual({}, payload, 'Wrong search courses payload');
      return {};
    }
  }));

  var done = assert.async();
  service.searchFeaturedCourses('the-term')
    .then(function() {
      done();
    });
});
