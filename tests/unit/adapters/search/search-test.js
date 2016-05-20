import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForAdapter from 'gooru-web/tests/helpers/module-for-adapter';

moduleForAdapter('adapter:search/search', 'Unit | Adapter | search/search', {
  // needs: []
});

test('searchCollections', function(assert) {
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  this.pretender.map(function() {
    this.get('/gooru-search/rest/v2/search/scollection', function(request) {
      assert.equal(request.queryParams['q'], 'any-term', 'Wrong term');
      assert.equal(request.queryParams['flt.collectionType'], 'collection', 'Wrong collection type');
      assert.equal(request.queryParams['start'], 1, 'Wrong default start');
      assert.equal(request.queryParams['length'], 20, 'Wrong default length');

      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  });
  adapter.searchCollections('any-term')
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});

test('searchAssessments', function(assert) {
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  this.pretender.map(function() {
    this.get('/gooru-search/rest/v2/search/scollection', function(request) {
      assert.equal(request.queryParams['q'], 'any-term', 'Wrong term');
      assert.equal(request.queryParams['flt.collectionType'], 'assessment', 'Wrong collection type');
      assert.equal(request.queryParams['start'], 1, 'Wrong default start');
      assert.equal(request.queryParams['length'], 20, 'Wrong default length');
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  });
  adapter.searchAssessments('any-term', true)
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});

test('searchResources for all resource types', function(assert) {
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  this.pretender.map(function() {
    this.get('/gooru-search/rest/v2/search/resource', function(request) {
      assert.equal(request.queryParams['q'], 'any-term', 'Wrong term');
      assert.equal(request.queryParams['start'], 1, 'Wrong default start');
      assert.equal(request.queryParams['length'], 20, 'Wrong default length');
      assert.ok(!request.queryParams['flt.resourceFormat'], 'Wrong format filters');
      assert.ok(!request.queryParams['flt.contentFormat'], 'Wrong content format');
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
    'token-api3': 'token-api-3'
  }));
  this.pretender.map(function() {
    this.get('/gooru-search/rest/v2/search/resource', function(request) {
      assert.equal(request.queryParams['q'], 'any-term', 'Wrong term');
      assert.equal(request.queryParams['start'], 1, 'Wrong default start');
      assert.equal(request.queryParams['length'], 20, 'Wrong default length');
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
    'token-api3': 'token-api-3'
  }));
  this.pretender.map(function() {
    this.get('/gooru-search/rest/v2/search/resource', function(request) {
      assert.equal(request.queryParams['q'], 'any-term', 'Wrong term');
      assert.equal(request.queryParams['start'], 1, 'Wrong default start');
      assert.equal(request.queryParams['length'], 20, 'Wrong default length');
      assert.equal(request.queryParams['flt.resourceFormat'], 'question', 'Wrong format filter');
      assert.ok(!request.queryParams['flt.questionType'], 'Wrong question type filters');
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  });
  adapter.searchQuestions('any-term', [])
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});

test('searchQuestions for some types', function(assert) {
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  this.pretender.map(function() {
    this.get('/gooru-search/rest/v2/search/resource', function(request) {
      assert.equal(request.queryParams['q'], 'any-term', 'Wrong term');
      assert.equal(request.queryParams['start'], 1, 'Wrong default start');
      assert.equal(request.queryParams['length'], 20, 'Wrong default length');
      assert.equal(request.queryParams['flt.resourceFormat'], 'question', 'Wrong format filter');
      assert.equal(request.queryParams['flt.questionType'], 'multiple_choice_question,multiple_answer_question', 'Wrong type filters');
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  });
  adapter.searchQuestions('any-term', ['MC', 'MA'])
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});
