import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForAdapter from 'gooru-web/tests/helpers/module-for-adapter';

moduleForAdapter('adapter:content/assessment', 'Unit | Adapter | content/assessment', {
  // needs: []
});

test('createAssessment', function(assert) {
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  const data = {
    body: {}
  };
  this.pretender.map(function() {
    this.post('/api/nucleus/v1/assessments', function() {
      return [201, {'Content-Type': 'text/plain'}, ''];
    }, false);
  });
  adapter.createAssessment(data)
    .then(function(response) {
      assert.equal('', response, 'Wrong response');
    });
});

test('updateAssessment', function(assert) {
  const adapter = this.subject();
  const expectedData = {
    'title': 'The Assessment title'
  };
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  this.pretender.map(function() {
    this.put('/api/nucleus/v1/assessments/assessment-id', function(request) {
      let requestBodyJson = JSON.parse(request.requestBody);
      assert.deepEqual(requestBodyJson, expectedData, 'Expected request body is not correct');
      return [204, {'Content-Type': 'application/json'}, ''];
    }, false);
  });
  adapter.updateAssessment('assessment-id', expectedData)
    .then(function() {
      assert.ok(true);
    }, function() {
      assert.ok(false, 'Update Assessment failed');
    });
});

