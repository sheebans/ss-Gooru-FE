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
    searchCollections: function(term, params) {
      assert.equal(term, 'the-term', 'Wrong search collections term');
      assert.equal(params.page, 1, 'Wrong page');
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
  service.searchCollections('the-term', { page: 1 })
    .then(function() {
      done();
    });
});

test('searchAssessments', function(assert) {
  const service = this.subject();

  assert.expect(3);
  service.set('searchAdapter', Ember.Object.create({
    searchAssessments: function(term, params) {
      assert.equal(term, 'the-term', 'Wrong search collections term');
      assert.equal(params.page, 1, 'Wrong page');
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
  service.searchAssessments('the-term', { page: 1 })
    .then(function() {
      done();
    });
});

test('searchResources', function(assert) {
  const service = this.subject();

  assert.expect(5);

  service.set('searchAdapter', Ember.Object.create({
    searchResources: function(term, categories, params) {
      assert.equal(term, 'the-term', 'Wrong search resources term');
      assert.equal(params.page, 2, 'Wrong page');
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
  service.searchResources('the-term', ['image', 'interactive', 'question'], { page: 2 })
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
