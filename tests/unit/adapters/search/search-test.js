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
      assert.equal(request.queryParams['q'], 'any-term', 'Wrong term');
      assert.equal(request.queryParams['start'], 1, 'Wrong default start');
      assert.equal(request.queryParams['length'], 20, 'Wrong default length');
      assert.equal(request.queryParams['sessionToken'], "session-token", 'Wrong token');
      assert.ok(!request.queryParams['flt.resourceFormat'], 'Wrong format filters');
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
      assert.equal(request.queryParams['q'], 'any-term', 'Wrong term');
      assert.equal(request.queryParams['start'], 1, 'Wrong default start');
      assert.equal(request.queryParams['length'], 20, 'Wrong default length');
      assert.equal(request.queryParams['sessionToken'], "session-token", 'Wrong token');
      assert.equal(request.queryParams['flt.resourceFormat'], 'image_resource,interactive_resource', 'Wrong format filters');
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  });
  adapter.searchResources('any-term', ['image', 'interactive'])
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});

test('searchQuestions for all types', function(assert) {
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token': 'session-token'
  }));
  this.pretender.map(function() {
    this.get('/gooru-search/rest/v2/search/resource', function(request) {
      assert.equal(request.queryParams['q'], 'any-term', 'Wrong term');
      assert.equal(request.queryParams['start'], 1, 'Wrong default start');
      assert.equal(request.queryParams['length'], 20, 'Wrong default length');
      assert.equal(request.queryParams['sessionToken'], "session-token", 'Wrong token');
      assert.equal(request.queryParams['flt.resourceFormat'], 'question', 'Wrong format filter');
      assert.ok(!request.queryParams['flt.questionType'], 'Wrong question type filters');
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  });
  adapter.searchResources('any-term', [])
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});

test('searchQuestions for some types', function(assert) {
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token': 'session-token'
  }));
  this.pretender.map(function() {
    this.get('/gooru-search/rest/v2/search/resource', function(request) {
      assert.equal(request.queryParams['q'], 'any-term', 'Wrong term');
      assert.equal(request.queryParams['start'], 1, 'Wrong default start');
      assert.equal(request.queryParams['length'], 20, 'Wrong default length');
      assert.equal(request.queryParams['sessionToken'], "session-token", 'Wrong token');
      assert.equal(request.queryParams['flt.resourceFormat'], 'question', 'Wrong format filter');
      assert.equal(request.queryParams['flt.questionType'], 'multiple_choice_question,multiple_answer_question', 'Wrong type filters');
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  });
  adapter.searchResources('any-term', ['MC', 'MA'])
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});
