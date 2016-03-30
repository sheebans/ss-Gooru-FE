import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:api-sdk/search', 'Unit | Service | api-sdk/search', {
  // needs: []
});

test('searchCollections', function(assert) {
  const service = this.subject();

  assert.expect(4);

  service.set('searchAdapter', Ember.Object.create({
    searchCollections: function(term, isTypeAssessment) {
      assert.equal(term, 'the-term', 'Wrong search collections term');
      assert.equal(isTypeAssessment, false, 'Wrong isTypeAssessment value');
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
