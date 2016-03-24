import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForAdapter from 'gooru-web/tests/helpers/module-for-adapter';

moduleForAdapter('adapter:search/search', 'Unit | Adapter | search/search', {
  // needs: []
});

test('searchCollections for collections', function(assert) {
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token': 'session-token'
  }));
  this.pretender.map(function() {
    this.get('/gooru-search/rest/v2/search/scollection', function(request) {
      assert.equal('any-term', request.queryParams['q'], 'Wrong term');
      assert.equal('collection', request.queryParams['flt.collectionType'], 'Wrong collection type');
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  });
  adapter.searchCollections('any-term')
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});

test('searchCollections for assessments', function(assert) {
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token': 'session-token'
  }));
  this.pretender.map(function() {
    this.get('/gooru-search/rest/v2/search/scollection', function(request) {
      assert.equal('any-term', request.queryParams['q'], 'Wrong term');
      assert.equal('assessment', request.queryParams['flt.collectionType'], 'Wrong collection type');
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  });
  adapter.searchCollections('any-term', true)
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});

test('searchResources for all resource types', function(assert) {
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token': 'session-token'
  }));
  this.pretender.map(function() {
    this.get('/gooru-search/rest/v2/search/resource', function(request) {
      assert.equal('any-term', request.queryParams['q'], 'Wrong term');
      assert.equal(undefined, request.queryParams['flt.resourceFormat'], 'Wrong collection type');
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  });
  adapter.searchResources('any-term', [])
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});

test('searchResources for some resource types', function(assert) {
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token': 'session-token'
  }));
  this.pretender.map(function() {
    this.get('/gooru-search/rest/v2/search/resource', function(request) {
      assert.equal('any-term', request.queryParams['q'], 'Wrong term');
      assert.equal('image,interactive,question', request.queryParams['flt.resourceFormat'], 'Wrong collection type');
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  });
  adapter.searchResources('any-term', ['image', 'interactive', 'question'])
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});
