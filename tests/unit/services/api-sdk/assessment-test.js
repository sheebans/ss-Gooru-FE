import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';
import AssessmentModel from 'gooru-web/models/content/assessment';

moduleForService('service:api-sdk/assessment', 'Unit | Service | api-sdk/assessment', {

});

test('createAssessment', function(assert) {
  const service = this.subject();
  let assessmentModel = Ember.Object.create();

  assert.expect(2);

  // There is not a Adapter stub in this case
  // Pretender was included because it is needed to simulate the response Headers including the Location value
  this.pretender.map(function() {
    this.post('/api/nucleus/v1/assessments', function() {
      return [201, {'Content-Type': 'text/plain', 'Location': 'assessment-id'}, ''];
    }, false);
  });

  service.set('assessmentSerializer', Ember.Object.create({
    serializeCreateAssessment: function(assessmentObject) {
      assert.deepEqual(assessmentObject, assessmentModel, 'Wrong assessment object');
      return {};
    }
  }));

  var done = assert.async();
  service.createAssessment(assessmentModel)
    .then(function() {
      assert.equal(assessmentModel.get('id'), 'assessment-id', 'Wrong assessment id');
      done();
    });
});

test('updateAssessment', function(assert) {
  const service = this.subject();
  const expectedAssessmentId = 'assessment-id';
  const expectedAssessmentModel = AssessmentModel.create({ title: 'Assessment title' });

  assert.expect(2);

  service.set('assessmentSerializer', Ember.Object.create({
    serializeUpdateAssessment: function(assessmentModel) {
      assert.deepEqual(assessmentModel, expectedAssessmentModel, 'Wrong assessment model');
      return {};
    }
  }));
  service.set('assessmentAdapter', Ember.Object.create({
    updateAssessment: function(assessmentId) {
      assert.equal(assessmentId, expectedAssessmentId, 'Wrong assessment id');
      return Ember.RSVP.resolve();
    }
  }));

  var done = assert.async();
  service.updateAssessment(expectedAssessmentId, expectedAssessmentModel).then(function() { done(); });
});
